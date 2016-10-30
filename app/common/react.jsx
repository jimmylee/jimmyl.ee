import React, { Component } from 'react';

const getDisplayName = (WrappedComponent) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

export const decorateComponentWithProps = (EmbeddedComponent, props) => (class extends Component {
  static displayName = `Decorated(${getDisplayName(EmbeddedComponent)})`;

  render() {
    return (
      <EmbeddedComponent { ...this.props } { ...props } />
    );
  }
});
