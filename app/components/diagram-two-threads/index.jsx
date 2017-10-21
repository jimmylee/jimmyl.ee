import classnames from 'classnames';
import React from 'react';
import { getViewportSize } from '../../common/window';

const treeNodeHeight = 24 * 6;
const treeGutters = 48;

export default class DiagramTwoThreads extends React.Component {
  constructor() {
    super();
    this.state = this._handleSizing();
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize = () => {
    this.setState(this._handleSizing());
  };

  _handleSizing = () => {
    const browserWidth = getViewportSize().width;
    const leftOffset = 90;
    const rightOffset = 90;
    const parentWidth = '75%';
    const width = 180;
    const fontSize = 16;

    if (browserWidth < 480) {
      return {
        parentWidth: '95%',
        leftOffset: 35,
        rightOffset: 35,
        width: 70,
        fontSize: 10,
      };
    }

    if (browserWidth < 820) {
      return {
        parentWidth: '90%',
        leftOffset: 75,
        rightOffset: 75,
        width: 150,
        fontSize: 12,
      };
    }

    if (browserWidth < 1100) {
      return {
        parentWidth: '75%',
        leftOffset,
        rightOffset,
        width,
        fontSize: 14,
      };
    }

    return {
      parentWidth,
      leftOffset,
      rightOffset,
      width,
      fontSize,
    };
  };

  render() {
    const { tree } = this.props;
    const {
      fontSize,
      leftOffset,
      rightOffset,
      width,
      parentWidth,
    } = this.state;

    const leftLineStyles = {
      left: leftOffset,
    };

    const rightLineStyles = {
      right: rightOffset,
    };

    const parentStyles = {
      width: parentWidth,
    };

    let height = 0;
    const treeNodes = tree.diagram.map((t, index) => {
      if (t.type === 'middle-line') {
        const middleLineStyles = {
          top: t.x + 32,
          left: leftOffset,
          right: rightOffset,
        };

        const classes = classnames('diagram-two-threads-middleLine', {
          'diagram-two-threads-middleLine--emphasis': t.emphasis,
        });

        return (
          <span className={classes} key={index} style={middleLineStyles} />
        );
      }

      if (t.type === 'left') {
        height += 68;

        const leftCircleStyles = {
          fontSize,
          top: t.x,
          width,
        };

        const classes = classnames('diagram-two-threads-tree-leftCircle', {
          'diagram-two-threads-tree-leftCircle--emphasis': t.emphasis,
        });

        return (
          <span key={index}>
            <div className={classes} style={leftCircleStyles}>
              {t.copy}
            </div>
          </span>
        );
      }

      if (t.type === 'right') {
        height += 68;

        const rightCircleStyles = {
          fontSize,
          top: t.x,
          width,
        };

        const classes = classnames('diagram-two-threads-tree-rightCircle', {
          'diagram-two-threads-tree-rightCircle--emphasis': t.emphasis,
        });

        return (
          <span key={index}>
            <div className={classes} style={rightCircleStyles}>
              {t.copy}
            </div>
          </span>
        );
      }
    });

    let treeStyles = {
      height: `${height + treeGutters + treeNodeHeight}px`,
    };

    return (
      <div className="diagram-two-threads" style={parentStyles}>
        <div className="diagram-two-threads-topLabel">{tree.topLabel}</div>
        <div className="diagram-two-threads-tree" style={treeStyles}>
          <div
            className="diagram-two-threads-leftLine"
            style={leftLineStyles}
          />
          <div
            className="diagram-two-threads-rightLine"
            style={rightLineStyles}
          />
          <div className="diagram-two-threads-nodeList">
            {treeNodes}
          </div>
        </div>
        <div className="diagram-two-threads-bottomLabel">
          {tree.bottomLabel}
        </div>
      </div>
    );
  }
}
