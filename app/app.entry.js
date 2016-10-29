'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

if ( process.env.NODE_ENV !== 'production' ) {
  window.React = React;
}

import reducers from './reducers/index';
import { middleware } from './common/middleware';
import { createRoutes } from './common/routing';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

const store = middleware.createStore(reducers);
const app = (
  <Provider store={ store }>
    <Router history={ middleware.history }>{createRoutes()}</Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
