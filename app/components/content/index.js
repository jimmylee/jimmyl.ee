import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return <article className="content" children={this.props.children} />;
  }
});
