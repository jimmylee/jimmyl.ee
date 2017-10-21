import React from 'react';

// TODO: Fix this hack.
let _firstLoad = true;

export const withOnEnterAnimation = () => BaseComponent => {
  class routeOnEnterComponent extends React.Component {
    state = {
      show: false,
    };

    componentWillMount() {
      if (_firstLoad) {
        _firstLoad = false;
        return this._handleShow();
      }

      const event = new CustomEvent('page-enter', {
        detail: { callback: this._handleShow },
      });

      document.body.scrollTop = 0;
      window.dispatchEvent(event);
    }

    _handleShow = () => this.setState({ show: true });

    render() {
      return this.state.show ? <BaseComponent {...this.props} /> : null;
    }
  }

  return routeOnEnterComponent;
};
