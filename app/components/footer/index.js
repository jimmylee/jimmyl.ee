import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return (
      <footer className="footer">
        {this.props.children}
      </footer>
    );
  }
});
