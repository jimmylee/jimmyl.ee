'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import base from './components/base';
import pageCSSAnimations from './pages/css-animations';
import pageHome from './pages/home';
import pageStats from './pages/site-stats';
import pageNotFound from './pages/not-found';

import { dispatchEnterEvent } from './utilities/dispatch';

import reducers from './reducers/index';
import middleware from './utilities/middleware';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

const store = middleware.createStore(reducers);

if ( process.env.NODE_ENV !== 'production' ) {
  window.React = React;
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ middleware.history }>
      <Route path="/" component={ base }>
        <IndexRoute component={ pageHome }
          onEnter={dispatchEnterEvent} />
        <Route path="/animation-performance"
          component={ pageCSSAnimations }
          onEnter={dispatchEnterEvent} />
        <Route path="/site-analysis"
          component={ pageStats }
          onEnter={dispatchEnterEvent} />
        <Route path="*"
          component={ pageNotFound }
          onEnter={dispatchEnterEvent} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
