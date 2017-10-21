import React from 'react';
import { compose } from 'redux';
import { withOnEnterAnimation } from '../../common/hoc.js';
import Content from '../../components/content/index';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import List from '../../components/diagram-column-list/index';
import { diagramOne, diagramTwo, diagramThree, diagramFour } from './diagrams';

const currentYear = new Date().getFullYear();

const Home = props => {
  return (
    <Content>
      <Header>
        <h1>{props.description}</h1>
      </Header>

      <p>
        I am a guy that lives to build websites, web applications, and WebGL experiments. I live and work in San Francisco.
        {' '}
      </p>

      <p>
        I'm working on the web platform for
        {' '}
        <a href="https://expo.io" alt="Expo product website">Expo</a>
        . If you love building for the web as much as I do, you should reach out.
      </p>

      <Footer>
        <List data={diagramOne} />
        <List data={diagramTwo} />
        <List data={diagramThree} />
        <List data={diagramFour} />
      </Footer>
    </Content>
  );
};

export default compose(withOnEnterAnimation())(Home);

