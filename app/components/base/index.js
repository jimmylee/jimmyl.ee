import React from 'react';
import Navigation from '../navigation';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { getViewportSize } from '../../utilities/window';
import * as actions from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  }, routeActions);
}

const navigationInactivePx = 0;
const navigationActivePx = 180;
const mobileBreakpoint = 720;
const mobileBreakpointNav = 1200;

const base = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    children: React.PropTypes.element
  },

  getInitialState() {
    window.onload = () => {
      const { actions } = this.props;
      const { domContentLoadedEventEnd, navigationStart } = window.performance.timing;
      const loadTime = (domContentLoadedEventEnd - navigationStart) / 1000;

      return actions.saveLoadTime(loadTime);
    }

    window.addEventListener('resize', this._handleResize);
    window.addEventListener('page-enter', this._handlePageEnter);

    this._startTimeout = null;
    this._endTimeout = null;
    this._interactionLock = true;

    return {
      navigationActive: false,
      y: this._getTranslateY(),
      x: navigationInactivePx,
      opacity: 1
    };
  },

  componentDidMount() {
    if (this._interactionLock) {
      window.setTimeout(() => {
        this._interactionLock = false;
      }, 1000);
    }
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

    return this.state.navigationActive ? navigationActivePx : navigationInactivePx;
  },

  _handleShowNavigation() {
    if (this._interactionLock) {
      return;
    }

    let size = navigationActivePx;
    if (getViewportSize().width >= mobileBreakpointNav) {
      size = navigationInactivePx;
    }

    this.setState({ navigationActive: true, x: size });
  },

  _handleHideNavigation() {
    this.setState({ navigationActive: false, x: navigationInactivePx });
  },

  _handlePageEnter(e) {
    window.clearTimeout(this._startTimeout);
    window.clearTimeout(this._endTimeout);

    const { callback } = e.detail;
    const y = this._getTranslateY();
    const offset = getViewportSize().height * 0.25;

    this.setState({
      opacity: 0,
      y: y + offset
    }, () => {
      this._startTimeout = setTimeout(() => {
        this.setState({
          opacity: 0,
          y: y - offset
        }, () => {
          this._endTimeout = window.setTimeout(() => {
            callback();
            this.setState({
              opacity: 1,
              y
            });
          }, 400);
        });
      }, 400);
    });
  },

  _handleResize() {
    this.setState({ y: this._getTranslateY(), x: this._getTranslateX() });
  },

  render() {
    const { children } = this.props;
    const { navigationActive } = this.state;
    const { x, y, opacity } = this.state;

    const baseStyles = {
      opacity,
      transform: `translate3d(${x}px, ${y}px, 0)`
    };

    return (
      <div className="base">
        <Navigation
          showNavigation={this._handleShowNavigation}
          hideNavigation={this._handleHideNavigation}
          active={navigationActive}
        />
        <div className="base-content" style={baseStyles}>
          {children}
        </div>
      </div>
    );
  }
});

export default connect(
  () => { return {} },
  mapDispatchToProps
)(base);
