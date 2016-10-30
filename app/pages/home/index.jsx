import React from 'react';
import Content from '../../components/content/index.jsx';
import Header from '../../components/header/index.jsx';
import List from '../../components/diagram-column-list/index.jsx';
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
          It is hard to keep track of projects and experiments and over the years I’ve thrown away many lines of code and lost notes. So this project is an opportunity to keep a living version of everything, as well as celebrate what is important to me: the craft of creating websites.
        </p>

        <p>
          So hello and nice to meet you! I'm Jim, an engineer who builds stuff for the web.
        </p>

        <List data={diagramOne} />
        <List data={diagramTwo} />
        <List data={diagramThree} />
        <List data={diagramFour} />
      </Content>
    );
  }
});

export default pageHome;
