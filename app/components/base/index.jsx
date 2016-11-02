import React from 'react';
import Navigation from '../navigation/index.jsx';
import { navigationItems } from '../../common/routing';
import { getViewportSize } from '../../common/window';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    pageNavigationActive: state.rootReducer.pageNavigationActive,
    pageX: state.rootReducer.pageX,
    pageY: state.rootReducer.pageY,
    pageOpacity: state.rootReducer.pageOpacity,
    pathname: state.route.location.pathname
  };
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  });
};

const navigationInactivePx = 0;
const navigationActivePx = 180;
const mobileBreakpoint = 680;
const mobileBreakpointNav = 1200;

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
    window.addEventListener('page-enter', this._handlePageEnter);

    this._startTimeout = null;
    this._endTimeout = null;

    this.props.actions.updatePagePosition({ y: this._getTranslateY(), x: navigationInactivePx });
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('page-enter', this._handlePageEnter);
  },

  _getTranslateY() {
    let modifier = 0.12;
    if (getViewportSize().width <= mobileBreakpoint) {
      modifier = 0.07;
    }
    return getViewportSize().height * modifier;
  },

  _getTranslateX() {
    if (getViewportSize().width >= mobileBreakpointNav) {
      return navigationInactivePx;
    }

    return this.props.pageNavigationActive ? navigationActivePx : navigationInactivePx;
  },

  _handleShowNavigation() {
    let size = navigationActivePx;
    if (getViewportSize().width >= mobileBreakpointNav) {
      size = navigationInactivePx;
    }

    this.props.actions.showNavigation(true);
    this.props.actions.updatePagePosition({ x: size });
  },

  _handleHideNavigation() {
    this.props.actions.showNavigation(false);
    this.props.actions.updatePagePosition({ x: navigationInactivePx });
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
    const offset = getViewportSize().height * 0.25;

    this.props.actions.updatePagePosition({
      alpha: 0,
      y: y + offset
    });

    this._startTimeout = window.setTimeout(() => {
      this.props.actions.updatePagePosition({
        y: y - offset
      });
    }, 300);

    this._endTimeout = window.setTimeout(() => {
      callback();
      this.props.actions.updatePagePosition({
        alpha: 1,
        y
      });

      this._startTimeout = null;
      this._endTimeout = null;
    }, 600);
  },

  _handleResize() {
    this.props.actions.updatePagePosition({
      y: this._getTranslateY(),
      x: this._getTranslateX()
    });
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
          hideNavigation={this._handleHideNavigation}
          links={navigationItems}
          showNavigation={this._handleShowNavigation}
        />
        <div className="base-content" style={baseStyles}>{children}</div>
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(base);
