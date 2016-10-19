import React from 'react';
import Content from '../../components/content';
import Header from '../../components/header';
import List from '../../components/diagram-column-list';
import { connect } from 'react-redux';
import { diagramThree } from './diagrams';

const mapStateToProps = (state) => {
  return {
    loadTime: state.rootReducer.loadTime
  };
}

const pageStats = React.createClass({
  propTypes: {
    loadTime: React.PropTypes.number
  },

  render() {
    const { loadTime } = this.props;

    const dataPoints = (
      <ul className="diagram-object-list">
        <li className="diagram-object-list-square">
          <header className="diagram-object-list-header">
            01&nbsp;&nbsp;Load Time
          </header>
          <h3 className="diagram-object-list-stat">
            {loadTime}
          </h3>
          <span className="diagram-object-list-label">seconds</span>
        </li>
          <li className="diagram-object-list-square">
          <header className="diagram-object-list-header">
            02&nbsp;&nbsp;JS Bundle Size
          </header>
          <h3 className="diagram-object-list-stat">
            350
          </h3>
          <span className="diagram-object-list-label">kilobytes</span>
        </li>
          <li className="diagram-object-list-square">
          <header className="diagram-object-list-header">
            03&nbsp;&nbsp;CSS Size
          </header>
          <h3 className="diagram-object-list-stat">
            15
          </h3>
          <span className="diagram-object-list-label">kilobytes</span>
        </li>
      </ul>
    );

    return (
      <Content>
        <Header>
          <h1>This project uses <a href="https://github.com/meanJim/dough">Dough</a> on <a href="https://github.com/">GitHub</a>.</h1>
        </Header>

        <p>
        For dough I picked <a href="https://github.com/gulpjs/gulp">Gulp</a> instead of <a href="https://github.com/webpack/webpack">Webpack</a>. I always use Webpack for <a href="https://github.com/facebook/react">React</a> projects so it feels nice to do things differently for fun.
        </p>

        <p>
        Other view libraries worth praising: <a href="https://github.com/developit/preact">Preact</a> and <a href="https://github.com/riot/riot">RiotJS</a>. I love anyone trying to decrease the bundle size of projects.
        </p>

        <p>
        All the assets are served from an <a href="https://aws.amazon.com/s3">Amazon S3</a> Bucket.
        </p>

        {dataPoints}

        <List data={diagramThree} />
      </Content>
    );
  }
});

export default connect(
  mapStateToProps
)(pageStats);
