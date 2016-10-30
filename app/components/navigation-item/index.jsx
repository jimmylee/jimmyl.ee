import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.object,
    active: React.PropTypes.bool,
    currentPath: React.PropTypes.string,
    description: React.PropTypes.node,
    index: React.PropTypes.number,
    onTouchStart: React.PropTypes.func,
    title: React.PropTypes.string,
    url: React.PropTypes.string
  },

  _handleClick: function() {
    this.context.router.push(this.props.url);
  },

  render() {
    const { active, currentPath, description, index, url, title } = this.props;

    let listNumber = index + 1;
    if (listNumber < 10) {
      listNumber = `0${listNumber}`
    }

    const rightClasses = classnames('navigationItem-right', {
      'navigationItem-right--visible': active,
      'navigationItem-right--chosen': currentPath === url
    });

    const itemClasses = classnames('navigationItem', {
      'navigationItem--chosen': currentPath === url
    });

    return (
      <div className={itemClasses}>
        <figure className="navigationItem-left"
         children={listNumber}
         onTouchStart={this.props.onTouchStart}/>
        <div className={rightClasses}
          onClick={this._handleClick}>
          <div className="navigationItem-title" children={title} />
          <div className="navigationItem-description">
            {description}
          </div>
        </div>
      </div>
    );
  }
});
