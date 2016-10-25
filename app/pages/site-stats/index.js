import React from 'react';
import Content from '../../components/content';
import Header from '../../components/header';
import List from '../../components/diagram-column-list';
import StatsTable from '../../components/diagram-stats-table';
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
    const pageStats = [
      {
        name: 'Load Time',
        data: `${loadTime}s`
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
