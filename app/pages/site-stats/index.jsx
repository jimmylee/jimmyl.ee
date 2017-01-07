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
        data: '510kbs'
      },
      {
        name: 'CSS',
        data: '21kbs'
      }
    ];

    return (
      <Content>
        <Header>
          <h1>{this.props.description}</h1>
        </Header>

        <p>I use your standard default system fonts for this project: sans-serif and serif.</p>

        <p>
        For dough I picked <a href="https://github.com/gulpjs/gulp">Gulp</a> and <a href="http://browserify.org/">Browserify</a> instead of <a href="https://github.com/webpack/webpack">Webpack</a>. I always use Webpack for <a href="https://github.com/facebook/react">React</a> projects so it feels nice to do things differently for fun. I have a feeling that the methodologies will converge and diverge for the rest of our lives. I usually crack jokes to cope with this.
        </p>

        <p>
        Other view libraries worth praising: <a href="https://github.com/developit/preact">Preact</a> and <a href="https://github.com/riot/riot">RiotJS</a>. Prerequisites for that praise: Anyone trying to decrease the bundle size of projects. Outside of that, <a href="https://vuejs.org">Vue.js (framework)</a> and <a href="https://github.com/trueadm/inferno">Inferno (library)</a> are two new variants I discovered near the end of 2016 that also show promise. Too bad we just can't write <s>Angular</s> React.
        </p>

        <p>
        All the assets of this website are served from an <a href="https://aws.amazon.com/s3">Amazon S3</a> Bucket. They are without gzip. I pay almost nothing to do this.
        </p>

        <StatsTable data={pageStats} />
      </Content>
    );
  }
});

export default connect(
  mapStateToProps
)(pageStats);
