'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

import reducers from './reducers/index';
import { middleware } from './common/middleware';
import { createRoutes } from './common/routing';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Base from './components/base';

const store = middleware.createStore(reducers);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Base>{createRoutes()}</Base>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
