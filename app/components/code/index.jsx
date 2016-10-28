import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

const syntaxHighlighterStyles = {
  backgroundColor: 'transparent',
  boxShadow: 'inset 0 0 0 1px rgba(238, 238, 238, 1)',
  fontSize: '0.8em',
  margin: '24px 0 24px 0',
  padding: '16px'
};

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    language: React.PropTypes.string
  },

  render() {
    const { children, language } = this.props;

    return (
      <SyntaxHighlighter
        children={children}
        language={language}
        style={github}
        customStyle={syntaxHighlighterStyles}
      />
    );
  }
});
