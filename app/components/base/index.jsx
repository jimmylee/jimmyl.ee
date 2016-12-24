import React from 'react';
import Navigation from '../navigation/index.jsx';
import { navigationItems } from '../../common/routing';
import { getViewportSize } from '../../common/window';
import { bindState } from '../../common/dispatch';

const mapStateToProps = (state) => {
  return {
    pageNavigationActive: state.rootReducer.pageNavigationActive,
    pageX: state.rootReducer.pageX,
    pageY: state.rootReducer.pageY,
    pageOpacity: state.rootReducer.pageOpacity,
    pathname: state.route.location.pathname,
    selectedIndex: state.rootReducer.userNavHoverIndex
  };
}

const base = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    children: React.PropTypes.element,
    pageNavigationActive: React.PropTypes.bool,
    pageX: React.PropTypes.number,
    pageY: React.PropTypes.number,
    pageOpacity: React.PropTypes.number
  },

  componentWillMount() {
    window.onload = () => {
      const { domContentLoadedEventEnd, navigationStart } = window.performance.timing;
      const loadTime = (domContentLoadedEventEnd - navigationStart) / 1000;

      return this.props.actions.saveLoadTime(loadTime);
    }

    window.addEventListener('resize', this._handleResize);
    window.addEventListener('scroll', this._handleScroll);
    window.addEventListener('page-enter', this._handlePageEnter);

    this._startTimeout = null;
    this._endTimeout = null;

    this.props.actions.updatePagePosition({ y: this._getTranslateY() });
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('page-enter', this._handlePageEnter);
  },

  _getTranslateY() {
    let modifier = 0.12;
    if (getViewportSize().width <= 680) {
      modifier = 0.07;
    }
    return getViewportSize().height * modifier;
  },

  _handlePageEnter(e) {
    if (this._startTimeout) {
      window.clearTimeout(this._startTimeout);
    }

    if (this._endTimeout) {
      window.clearTimeout(this._endTimeout);
    }

    const { callback } = e.detail;
    const y = this._getTranslateY();
    const offset = getViewportSize().height * 0.15;

    this.props.actions.updatePagePosition({
      animating: true,
      alpha: 0,
      y: y + offset
    });

    this._startTimeout = window.setTimeout(() => {
      this.props.actions.updatePagePosition({
        alpha: 0,
        y: y - offset
      });
    }, 300);

    this._endTimeout = window.setTimeout(() => {
      callback();
      this.props.actions.updatePagePosition({
        animating: false,
        alpha: 1,
        y
      });

      this._startTimeout = null;
      this._endTimeout = null;
    }, 600);
  },

  _handleScroll() {
    if (this.props.selectedIndex) {
      this.props.actions.updateNavHover(null);
    }
  },

  _handleResize() {
    if (this.props.selectedIndex) {
      this.props.actions.updateNavHover(null);
    }

    this.props.actions.updatePagePosition({ y: this._getTranslateY() });
  },

  render() {
    const { children, pageNavigationActive, pageX, pageY, pageOpacity, pathname } = this.props;
    const baseStyles = {
      opacity: pageOpacity,
      transform: `translate3d(${pageX}px, ${pageY}px, 0)`
    };

    return (
      <div className="base">
        <Navigation
          active={pageNavigationActive}
          currentPath={pathname}
          links={navigationItems}
          showNavigation={this._handleShowNavigation}
        />
        <div className="base-content" style={baseStyles}>{children}</div>
        <div className="base-spacer" />
      </div>
    );
  }
});

export default bindState(mapStateToProps)(base);
