import React from 'react';
import { Transition } from 'react-transition-group';
import { compose } from 'redux';
import { getViewportSize } from '../../common/window';
import { bindState } from '../../common/dispatch';

let _firstRender = true;

const mapStateToProps = state => {
  return {
    pageNavigationActive: state.rootReducer.pageNavigationActive,
    pageX: state.rootReducer.pageX,
    pageY: state.rootReducer.pageY,
    pageOpacity: state.rootReducer.pageOpacity,
    selectedIndex: state.rootReducer.userNavHoverIndex,
  };
};

// NOTE(jim): Content has all the animation code because it is the root
// component that is unmounted and mounted when the nav changes.
class Content extends React.Component {
  state = {
    animate: false,
  };

  componentWillMount() {
    window.addEventListener('resize', this._handleResize);
    window.addEventListener('scroll', this._handleScroll);
    window.addEventListener('page-leave', this._handlePageLeave);
    this.props.actions.updatePagePosition({ y: this._getTranslateY() });
  }

  componentDidMount() {
    if (_firstRender) {
      _firstRender = false;
      return;
    }

    this._handleAnimate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('page-leave', this._handlePageLeave);
  }

  _getTranslateY = () => {
    let modifier = 0.12;
    if (getViewportSize().width <= 680) {
      modifier = 0.07;
    }
    return getViewportSize().height * modifier;
  };

  _handleAnimate = () => this.setState({ animate: true });

  _handleScroll = () => {
    if (this.props.selectedIndex) {
      this.props.actions.updateNavHover(null);
    }
  };

  _handleResize = () => {
    if (this.props.selectedIndex) {
      this.props.actions.updateNavHover(null);
    }

    this.props.actions.updatePagePosition({ y: this._getTranslateY() });
  };

  _handlePageLeave = e => {
    document.body.scrollTop = 0;
    const offset = getViewportSize().height * 0.15;
    const y = this._getTranslateY();
    this.props.actions.updatePagePosition({
      animating: true,
      alpha: 0,
      y: y + offset,
    });

    window.setTimeout(() => {
      const { callback } = e.detail;
      callback();
    }, 300);
  };

  _onEntering = () => {
    const y = this._getTranslateY();
    const offset = getViewportSize().height * 0.15;
    this.props.actions.updatePagePosition({
      animating: true,
      alpha: 0,
      y: y - offset,
    });
  };

  _onEntered = () => {
    const y = this._getTranslateY();
    this.props.actions.updatePagePosition({
      animating: false,
      alpha: 1,
      y,
    });
  };

  render() {
    const baseStyles = {
      opacity: this.props.pageOpacity,
      transform: `translate3d(${this.props.pageX}px, ${this.props.pageY}px, 0)`,
    };

    return (
      <Transition
        in={this.state.animate}
        onEntering={this._onEntering}
        onEntered={this._onEntered}
        timeout={400}>
        <article
          className="content"
          children={this.props.children}
          style={{ ...baseStyles }}
        />
      </Transition>
    );
  }
}

export default compose(bindState(mapStateToProps))(Content);
