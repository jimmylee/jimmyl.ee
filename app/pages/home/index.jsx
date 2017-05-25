import React from 'react';
import Content from '../../components/content/index';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import List from '../../components/diagram-column-list/index';
import { diagramOne, diagramTwo, diagramThree, diagramFour } from './diagrams';

const currentYear = new Date().getFullYear();

const pageHome = React.createClass({
  render() {
    return (
      <Content>
        <Header>
          <h1>{this.props.description}</h1>
        </Header>

        <p>
          I am an engineer living in San Francisco who loves creating single page web applications and websites. I also love researching front-end architecture and asset building systems. Design is a big part of my life and I am excited to see more engineers dedicating themselves to learning design and thinking about the usage of their software.
        </p>
        <p>
          I currently work on the web platform for
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
  },
});

export default pageHome;
