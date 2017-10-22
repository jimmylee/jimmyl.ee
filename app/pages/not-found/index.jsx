import React from 'react';
import Content from '../../components/content/index.jsx';
import Header from '../../components/header/index.jsx';

export default props => {
  return (
    <Content {...props}>
      <Header>
        <h1>Not Found</h1>
      </Header>

      <p>The page you are looking for does not exist.</p>
    </Content>
  );
};
