import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../navigation-item';

const links = [
  {
    url: '/',
    title: 'Foreword',
    description: 'Some thoughts'
  },
  {
    url: '/site-analysis',
    title: 'Site Analysis',
    description: 'Client bundle size, libraries used, and load time'
  },
  {
    url: '/animation-performance',
    title: 'Animation Performance',
    description: 'Notes about the performance of CSS animations in the browser'
  }
];

export default React.createClass({
  propTypes: {
    showNavigation: React.PropTypes.func,
    hideNavigation: React.PropTypes.func,
    active: React.PropTypes.bool
  },

  getInitialState() {
    window.addEventListener('click', this._handleOutsideClick);
    window.addEventListener('touchstart', this._handleOutsideClick);
    window.addEventListener('scroll', this._handleScroll);

    this._hideTimeout;
    return null;
  },

  componentWillUnmount() {
    window.removeEventListener('click', this._handleOutsideClick);
    window.removeEventListener('touchstart', this._handleOutsideClick);
    window.removeEventListener('scroll', this._handleScroll);
  },

  _handleScroll() {
    if (!this.props.active) {
      return false;
    }

    window.clearTimeout(this._hideTimeout);
    this._hideTimeout = window.setTimeout(() => {
      this.props.hideNavigation();
    }, 400);
  },

  _handleMouseLeave() {
    if (!this.props.active) {
      return false;
    }

    window.clearTimeout(this._hideTimeout);
    this._hideTimeout = window.setTimeout(() => {
      this.props.hideNavigation();
    }, 400);
  },

  _handleOutsideClick(e) {
    if (!this.props.active) {
      return false;
    }

    window.clearTimeout(this._hideTimeout);
    const el = ReactDOM.findDOMNode(this.refs.nav);
    if (el && !el.contains(e.target)) {
      this.props.hideNavigation();
    }
  },

  _handleMouseEnter() {
    window.clearTimeout(this._hideTimeout);
    this.props.showNavigation();
  },

  _handleTouchStart() {
    window.clearTimeout(this._hideTimeout);
    this.props.showNavigation();
  },

  render() {
    const { active } = this.props;

    const elements = links.map((e, i) => {
      const { url, title, description } = e;
      return (
        <Item
          active={active}
          description={description}
          key={i}
          index={i}
          title={title}
          url={url}
        />
      );
    });

    return (
      <nav
        children={elements}
        className="navigation"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        ref="nav"
      />
    );
  }
});
