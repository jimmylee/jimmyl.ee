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
          It is hard to keep track of experiments and over the years I’ve thrown away many lines of code and lost useful notes. So this project is an opportunity to keep a living version of everything, as well as celebrate what is important to me: the craft of creating websites.
        </p>

        <p>
          So hello and nice to meet you! I'm Jim, an engineer who builds stuff for the web.
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
