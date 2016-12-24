import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../navigation-item/index.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    animating: state.rootReducer.animating,
    selectedIndex: state.rootReducer.userNavHoverIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  });
};

const navigation = React.createClass({
  propTypes: {
    currentPath: React.PropTypes.string,
    links: React.PropTypes.array
  },

  _handleMouseLeave() {
    this.props.actions.updateNavHover(null);
    if (!this.props.animating) {
      this.props.actions.updatePagePosition({ alpha: 1 });
    }
  },

  render() {
    const { currentPath, links } = this.props;

    const elements = links.map((each, i) => {
      const { description, hide, emojis, title, url } = each;
      if (hide) {
        return;
      }

      return (
        <Item
          currentPath={currentPath}
          description={description}
          emojis={emojis}
          index={i}
          key={i}
          title={title}
          url={url}
        />
      );
    });

    return (
      <nav children={elements}
        className="navigation"
        onMouseLeave={this._handleMouseLeave}
        ref="nav" />
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigation);
