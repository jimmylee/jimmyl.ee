import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Cube from '../cube/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    animating: state.rootReducer.animating,
    pageOpacity: state.rootReducer.pageOpacity,
    selectedIndex: state.rootReducer.userNavHoverIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  });
};

const navItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.object,
    currentPath: React.PropTypes.string,
    description: React.PropTypes.node,
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    url: React.PropTypes.string
  },

  _handleClick: function() {
    this.context.router.push(this.props.url);
  },

  _handleMouseMove: function() {
    if (this.props.index === this.props.selectedIndex) {
      return;
    }

    if (!this.props.animating) {
      this.props.actions.updatePagePosition({ alpha: 0.1 });
    }

    this.props.actions.updateNavHover(this.props.index);
  },

  render() {
    const { currentPath, description, emojis, index, selectedIndex, url, title } = this.props;

    let listNumber = index + 1;
    if (listNumber < 10) {
      listNumber = `0${listNumber}`
    }

    const selected = currentPath === url;
    const hovered = index === selectedIndex;
    const listElement = (
      <Cube emojis={emojis}
        hovered={hovered}
        onClick={this._handleClick}
        selected={selected}
        value={listNumber} />
    );
    const itemClasses = classnames('navigationItem', {
      'navigationItem--hovered': hovered
    });

    return (
      <div className={itemClasses}
        onMouseMove={this._handleMouseMove}>
        <figure
          children={listElement}
          className="navigationItem-left"
          onClick={this._handleClick} />
        {!selected ? (
          <div className="navigationItem-right"
            onClick={this._handleClick}>
            <div className="navigationItem-title" children={title} />
            <div className="navigationItem-description">
              {description}
            </div>
          </div>
        ) : null }
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navItem);
