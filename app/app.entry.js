'use strict';

import React from 'react';

window.location.replace('https://reading.supply/@jim');

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createRoutes } from './common/routing';
import { BrowserRouter } from 'react-router-dom';

import reducers from './reducers/index';
import Base from './components/base';

const store = createStore(reducers);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Base>
        {createRoutes()}
      </Base>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
