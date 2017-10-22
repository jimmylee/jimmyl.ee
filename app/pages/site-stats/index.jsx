import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Content from '../../components/content/index.jsx';
import Header from '../../components/header/index.jsx';
import List from '../../components/diagram-column-list/index.jsx';
import StatsTable from '../../components/diagram-stats-table/index.jsx';
import { diagramThree } from './diagrams';

const mapStateToProps = state => {
  return {
    statsLoadTime: state.rootReducer.statsLoadTime,
  };
};

const PageStats = props => {
  const { statsLoadTime } = props;
  const pageStats = [
    {
      name: 'Load Time',
      data: `${statsLoadTime}s`,
    },
    {
      name: 'JavaScript',
      data: '105kbs',
    },
    {
      name: 'CSS',
      data: '2.8kbs',
    },
  ];

  return (
    <Content {...props}>
      <Header>
        <h1>{props.description}</h1>
      </Header>

      <p>
        I use your standard default system fonts for this project. You don't need anything fancy to make a design work.
      </p>

      <p>
        I picked
        {' '}
        <a href="https://github.com/gulpjs/gulp">Gulp</a>
        {' '}
        and
        {' '}
        <a href="http://browserify.org/">Browserify</a>
        {' '}
        instead of
        {' '}
        <a href="https://github.com/webpack/webpack">Webpack</a>
        . That made this project the only project I have not using Webpack. It is kind of like creating an artifact.
      </p>

      <p>
        If you are looking to create your own site. I recommend {' '}
        <a href="https://github.com/zeit/next.js">NextJS</a>
        {' '}
        instead of my repository. With NextJS you get babel configured and server side rendering (SSR) for free.
        {' '}
      </p>

      <p>
        All the assets of this website are served from an
        {' '}
        <a href="https://aws.amazon.com/s3">Amazon S3</a>
        {' '}
        Bucket with a GZIP before upload. I sacrifice server side rendering but I end up paying close to nothing for hosting.
      </p>
    </Content>
  );
};

export default compose(connect(mapStateToProps))(PageStats);
