import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../navigation-item/index.jsx';

export default React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    currentPath: React.PropTypes.string,
    links: React.PropTypes.array
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
          title={title}
          url={url}
        />
      );
    });

    return <nav children={elements} className="navigation" ref="nav" />;
  }
});
