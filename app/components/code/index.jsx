import React from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import { github } from 'react-syntax-highlighter/dist/styles';

import js from './javascript';
import scss from './scss';

registerLanguage('javascript', js);
registerLanguage('scss', scss);

const syntaxHighlighterStyles = {
  backgroundColor: 'transparent',
  borderRadius: '3px',
  boxShadow: 'inset 0 0 0 1px rgba(238, 238, 238, 1)',
  fontSize: '0.8em',
  margin: '40px 0 40px 0',
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
