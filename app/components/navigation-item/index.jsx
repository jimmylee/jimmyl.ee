import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

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

const navItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.object,
    active: React.PropTypes.bool,
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

    this.props.actions.updateNavHover(this.props.index);
  },

  render() {
    const { active, currentPath, description, index, selectedIndex, url, title } = this.props;

    let listNumber = index + 1;
    if (listNumber < 10) {
      listNumber = `0${listNumber}`
    }

    const rightClasses = classnames('navigationItem-right', {
      'navigationItem-right--visible': active,
      'navigationItem-right--chosen': currentPath === url
    });

    const itemClasses = classnames('navigationItem', {
      'navigationItem--chosen': currentPath === url,
      'navigationItem--hovered': index === selectedIndex
    });

    return (
      <div className={itemClasses}
        onMouseMove={this._handleMouseMove}
        onClick={this._handleClick}>
        <figure
          className="navigationItem-left"
          children={listNumber}
        />
        <div
          className={rightClasses}
        >
          <div className="navigationItem-title" children={title} />
          <div className="navigationItem-description">
            {description}
          </div>
        </div>
      </div>
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navItem);
