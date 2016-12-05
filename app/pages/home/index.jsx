import React from 'react';
import Content from '../../components/content/index';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import List from '../../components/diagram-column-list/index';
import { diagramOne, diagramTwo, diagramThree, diagramFour } from './diagrams';

const currentYear = new Date().getFullYear();

const pageHome = React.createClass({
  render() {
    const yearsSince = currentYear - 2008;

    return (
      <Content>
        <Header>
          <h1>{this.props.description}</h1>
        </Header>

        <p>
          I am an engineer based in San Francisco that loves building single page web applications and websites. If you share my love for building the web, I hope that we will find some time to collaborate someday, somehow.
        </p>

        <Footer>
          <List data={diagramOne} />
          <List data={diagramTwo} />
          <List data={diagramThree} />
          <List data={diagramFour} />
        </Footer>
      </Content>
    );
  }
});

export default pageHome;
