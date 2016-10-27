import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    chosen: React.PropTypes.bool,
    description: React.PropTypes.string,
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    url: React.PropTypes.string
  },

  render() {
    const {
      active,
      description,
      index,
      url,
      title
    } = this.props;

    let listNumber = index + 1;
    if (listNumber < 10) {
      listNumber = `0${listNumber}`
    }

    const rightClasses = classnames('navigationItem-right', {
      'navigationItem-right--visible': active,
      'navigationItem-right--chosen': window.location.pathname === url
    });

    const itemClasses = classnames('navigationItem', {
      'navigationItem--chosen': window.location.pathname === url
    });

    return (
      <div className={itemClasses}>
        <figure className="navigationItem-left" children={listNumber} />
        <Link className={rightClasses} to={url}>
          <div className="navigationItem-title" children={title} />
          <div className="navigationItem-description" children={description} />
        </Link>
      </div>
    );
  }
});
