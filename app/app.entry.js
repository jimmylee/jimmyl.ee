'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

if ( process.env.NODE_ENV !== 'production' ) {
  window.React = React;
}

import base from './components/base/index.jsx';
import pageCSSAnimations from './pages/css-animations/index.jsx';
import pageHome from './pages/home/index.jsx';
import pageStats from './pages/site-stats/index.jsx';
import pageNotFound from './pages/not-found/index.jsx';

import { dispatchEnterEvent } from './common/dispatch';

import reducers from './reducers/index';
import middleware from './common/middleware';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

const store = middleware.createStore(reducers);

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
