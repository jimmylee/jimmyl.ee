import React from 'react';
import { getViewportSize } from '../../common/window';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },

  getInitialState() {
    window.addEventListener('resize', this._handleResize);
    return {
      characterSize: this._getCharacterSize()
    };
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  _getCharacterSize() {
    return (getViewportSize().width < 680) ? 6 : 10;
  },

  _handleResize() {
    const characterSize = this._getCharacterSize();
    if (characterSize === this.state.characterSize) {
      return;
    }

    this.setState({ characterSize });
  },

  render() {
    const { data } = this.props;
    const { characterSize } = this.state;

    const widthMap = {};
    data.sizing.forEach((each, index) => {
      widthMap[index] = `${each.length * characterSize}px`;
    });

    const listElements = data.data.map((each, index) => {
      const columns = each.map((column, columnIndex) => {
        let columnStyles = {};
        if (widthMap[columnIndex]) {
          columnStyles.maxWidth = widthMap[columnIndex];
        }

        return (
          <span className="diagram-column-list-text"
            key={column}
            style={columnStyles}>
            {column}
          </span>
        );
      });
      return <li className="diagram-column-list-item" key={index}>{columns}</li>;
    });

    return (
      <ul className="diagram-column-list">
        <hgroup className="diagram-column-list-title">{data.title}</hgroup>
        {listElements}
      </ul>
    );
  }
});
