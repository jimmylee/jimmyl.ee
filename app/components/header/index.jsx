import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return <header>{this.props.children}</header>;
  }
});
