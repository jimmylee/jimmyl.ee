import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../navigation-item/index.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

const mapStateToProps = (state) => {
  return {
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
    active: React.PropTypes.bool,
    currentPath: React.PropTypes.string,
    links: React.PropTypes.array
  },

  _handleMouseLeave() {
    this.props.actions.updateNavHover(null);
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
