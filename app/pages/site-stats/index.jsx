import React from 'react';
import Content from '../../components/content/index.jsx';
import Header from '../../components/header/index.jsx';
import List from '../../components/diagram-column-list/index.jsx';
import StatsTable from '../../components/diagram-stats-table/index.jsx';
import { connect } from 'react-redux';
import { diagramThree } from './diagrams';

const mapStateToProps = (state) => {
  return {
    statsLoadTime: state.rootReducer.statsLoadTime
  };
}

const pageStats = React.createClass({
  propTypes: {
    statsLoadTime: React.PropTypes.number
  },

  render() {
    const { statsLoadTime } = this.props;
    const pageStats = [
      {
        name: 'Load Time',
        data: `${statsLoadTime}s`
      },
      {
        name: 'JavaScript',
        data: '350kbs'
      },
      {
        name: 'CSS',
        data: '15kbs'
      }
    ];

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

        <StatsTable data={pageStats} />

        <List data={diagramThree} />
      </Content>
    );
  }
});

export default connect(
  mapStateToProps
)(pageStats);
