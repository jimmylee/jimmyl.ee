import classnames from 'classnames';
import React from 'react';
import { getViewportSize } from '../../common/window';

export default class DiagramColumnList extends React.Component {
  constructor() {
    super();

    this.state = {
      characterSize: this._getCharacterSize(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _getCharacterSize = () => {
    return getViewportSize().width < 680 ? 7 : 9;
  };

  _handleResize = () => {
    const characterSize = this._getCharacterSize();
    if (characterSize === this.state.characterSize) {
      return;
    }

    this.setState({ characterSize });
  };

  render() {
    const { data } = this.props;
    const { characterSize } = this.state;

    const widthMap = {};
    data.sizing.forEach((each, index) => {
      widthMap[index] = `${each.length * characterSize}px`;
    });

    let lastColumn = null;
    const listElements = data.data.map((each, index) => {
      const columns = each.map((column, columnIndex) => {
        let columnStyles = {};
        if (widthMap[columnIndex]) {
          columnStyles.maxWidth = widthMap[columnIndex];
        }

        let same = false;
        if (columnIndex === 0) {
          same = column === lastColumn;
          lastColumn = column;
        }

        const last = columnIndex === each.length - 1;
        const classes = classnames('diagram-column-list-text', {
          'diagram-column-list-text--bold': (each.length > 1 &&
            columnIndex === 0) ||
            columnIndex === 1,
          'diagram-column-list-text--spaced': columnIndex === 0 ||
            columnIndex === 1,
          'diagram-column-list-text--last': last,
          'diagram-column-list-text--same': same,
          'diagram-column-list-text--static': !last,
        });

        if (last && column.startsWith && column.startsWith('http')) {
          return (
            <a
              className={classes}
              href={column}
              key={column}
              style={columnStyles}>
              {column}
            </a>
          );
        }

        return (
          <span className={classes} key={column} style={columnStyles}>
            {column}
          </span>
        );
      });

      return (
        <li className="diagram-column-list-item" key={index}>{columns}</li>
      );
    });

    return (
      <ul className="diagram-column-list">
        <hgroup className="diagram-column-list-title">{data.title}</hgroup>
        {listElements}
      </ul>
    );
  }
}
