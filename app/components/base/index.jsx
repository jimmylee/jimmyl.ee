import React from 'react';
import Navigation from '../navigation/index.jsx';
import { navItems } from '../../common/routing';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { getViewportSize } from '../../common/window';
import * as actions from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    pageNavigationActive: state.rootReducer.pageNavigationActive,
    pageX: state.rootReducer.pageX,
    pageY: state.rootReducer.pageY,
    pageOpacity: state.rootReducer.pageOpacity
  };
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  }, routeActions);
};

const navigationInactivePx = 0;
const navigationActivePx = 180;
const mobileBreakpoint = 720;
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
    window.clearTimeout(this._startTimeout);
    window.clearTimeout(this._endTimeout);

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

      this._endTimeout = window.setTimeout(() => {
        callback();
        this.props.actions.updatePagePosition({
          alpha: 1,
          y
        });
      }, 300);
    }, 300);
  },

  _handleResize() {
    this.props.actions.updatePagePosition({
      y: this._getTranslateY(),
      x: this._getTranslateX()
    });
  },

  render() {
    const { children, pageNavigationActive, pageX, pageY, pageOpacity } = this.props;
    const baseStyles = {
      opacity: pageOpacity,
      transform: `translate3d(${pageX}px, ${pageY}px, 0)`
    };

    return (
      <div className="base">
        <Navigation
          links={navItems}
          showNavigation={this._handleShowNavigation}
          hideNavigation={this._handleHideNavigation}
          active={pageNavigationActive}
        />
        <div className="base-content" style={baseStyles}>
          {children}
        </div>
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(base);
