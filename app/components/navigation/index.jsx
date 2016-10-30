import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../navigation-item/index.jsx';

export default React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    currentPath: React.PropTypes.string,
    links: React.PropTypes.array,
    showNavigation: React.PropTypes.func,
    hideNavigation: React.PropTypes.func
  },

  componentWillMount() {
    window.addEventListener('click', this._handleOutsideClick);
    window.addEventListener('touchstart', this._handleOutsideClick);
    window.addEventListener('scroll', this._handleScroll);

    this._hideTimeout;
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

    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
    }

    this._hideTimeout = window.setTimeout(() => {
      this.props.hideNavigation();
    }, 400);
  },

  _handleMouseLeave() {
    if (!this.props.active) {
      return false;
    }

    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
    }

    this._hideTimeout = window.setTimeout(() => {
      this.props.hideNavigation();
    }, 400);
  },

  _handleOutsideClick({ target }) {
    if (!this.props.active) {
      return false;
    }

    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
    }

    const el = ReactDOM.findDOMNode(this.refs.nav);
    if (el && !el.contains(target)) {
      this.props.hideNavigation();
    }
  },

  _handleMouseMove() {
    if (this.props.active) {
      return;
    }

    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
    }

    this.props.showNavigation();
  },

  _handleTouchStart() {
    if (this.props.active) {
      return;
    }

    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
    }

    this.props.showNavigation();
  },

  render() {
    const { active, currentPath, links } = this.props;

    const elements = links.map((each, i) => {
      const { url, title, description, hide } = each;
      if (hide) {
        return;
      }

      return (
        <Item
          active={active}
          currentPath={currentPath}
          description={description}
          index={i}
          key={i}
          onTouchStart={this._handleTouchStart}
          title={title}
          url={url}
        />
      );
    });

    return (
      <nav
        children={elements}
        className="navigation"
        onMouseMove={this._handleMouseMove}
        onMouseLeave={this._handleMouseLeave}
        ref="nav"
      />
    );
  }
});
