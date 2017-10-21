import React from 'react';

export default class Header extends React.Component {
  render() {
    return <header>{this.props.children}</header>;
  }
}
