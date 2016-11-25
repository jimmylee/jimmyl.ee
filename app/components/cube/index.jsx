import classnames from 'classnames';
import React from 'react';

export default React.createClass({
  propTypes: {
    emojis: React.PropTypes.array,
    hovered: React.PropTypes.bool,
    rotations: React.PropTypes.number,
    selected: React.PropTypes.bool,
    value: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      emojis: ['🛳', '🚀', '🛰'],
      hovered: false,
      rotations: 4,
      selected: false
    };
  },

  _getSides() {
    const { emojis, selected, value } = this.props;
    const sides = [];

    sides.push(<li className="cube-side" key="cube-value">
      <span className="cube-side-content">{value}</span>
    </li>);

    emojis.forEach((emoji) => {
      sides.push(
        <li className="cube-side" key={emoji}>
          <span className="cube-side-content">
            <span className="cube-emoji">{emoji}</span>
          </span>
        </li>
      );
    });

    return sides;
  },

  render() {
    const { hovered, rotations, selected } = this.props;

    const cubeClasses = classnames('cube', {
      'cube--rotateOnce': rotations === 1,
      'cube--rotateTwice': rotations === 2,
      'cube--rotateThrice': rotations === 3,
      'cube--rotateEach': rotations === 4,
      'cube--rotateFull': rotations > 4,
      'cube--selected': selected,
      'cube--hovered': hovered
    });

    const sides = this._getSides();

    return (
      <div className={cubeClasses}>
        <ul className="cube-container">{sides}</ul>
      </div>
    );
  }
});
