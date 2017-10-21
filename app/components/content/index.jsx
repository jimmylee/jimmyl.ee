import React from 'react';

export default class Content extends React.Component {
  render() {
    return <article className="content" children={this.props.children} />;
  }
}
