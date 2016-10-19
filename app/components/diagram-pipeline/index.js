import React from 'react';
import { getViewportSize } from '../../utilities/window';
const treeNodeHeight = 24 * 6;
const treeGutters = 48;

export default React.createClass({
  propTypes: {
    tree: React.PropTypes.object
  },

  getInitialState() {
    return this._handleSizing();
  },

  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  _handleResize() {
    this.setState(this._handleSizing());
  },

  _handleSizing() {
    const browserWidth = getViewportSize().width;

    let width = '75%';
    let fontSize = 16;
    let nodeHeight = 150;

    if (browserWidth < 350) {
      return {
        width: '90%',
        fontSize: 10,
        nodeHeight: 180
      };
    }


    if (browserWidth < 480) {
      return {
        width: '90%',
        fontSize: 10,
        nodeHeight: 155
      };
    }

    if (browserWidth < 820) {
      return {
        width: '90%',
        fontSize: 12,
        nodeHeight: 155
      };
    }

    if (browserWidth < 1100) {
      return {
        width: '85%',
        fontSize: 14,
        nodeHeight
      };
    }

    return {
      width,
      fontSize,
      nodeHeight
    };
  },

  render() {
    const { tree } = this.props;
    const { width, fontSize, nodeHeight } = this.state;

    const widthStyles = { width };
    const typeStyles = { fontSize };

    let height = 0;
    const treeNodes = tree.diagram.map((t, index) => {
      if (t.type === 'normal') {
        height += nodeHeight;

        let label;
        if (t.label) {
          label = (
            <label className="diagram-pipeline-tree-node-title" style={typeStyles}>
              {t.label}
            </label>
          );
        }

        let copy;
        if (t.copy) {
          copy = (
            <div className="diagram-pipeline-tree-node-copy" style={typeStyles}>
              {t.copy}
            </div>
          );
        }

        return <div className="diagram-pipeline-tree-node" key={index}>{label}{copy}</div>;
      }
    });

    let treeStyles = {
      height: `${height + treeGutters + treeNodeHeight}px`
    };

    return (
      <div className="diagram-pipeline" style={widthStyles}>
        <div className="diagram-pipeline-topLabel">{tree.topLabel}</div>
        <div className="diagram-pipeline-tree" style={treeStyles}>
          <div className="diagram-pipeline-line" />
          <div className="diagram-pipeline-nodeList">
            {treeNodes}
          </div>
        </div>
        <div className="diagram-pipeline-bottomLabel">{tree.bottomLabel}</div>
      </div>
    );
  }
});
