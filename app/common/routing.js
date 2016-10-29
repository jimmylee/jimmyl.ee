import React from 'react';
import base from '../components/base/index.jsx';
import pageCSSAnimations from '../pages/css-animations/index.jsx';
import pageHome from '../pages/home/index.jsx';
import pageNotFound from '../pages/not-found/index.jsx';
import pageStats from '../pages/site-stats/index.jsx';
import { dispatchEnterEvent } from '../common/dispatch';
import { Route, IndexRoute } from 'react-router';

export const baseRoute = '/';
export const navigationItems = [
  {
    url: baseRoute,
    title: 'Foreword',
    description: 'The purpose: create a web app for sharing experiments and research.',
    component: pageHome
  },
  {
    url: '/site-analysis',
    title: 'Site Analysis',
    description: 'This project uses Dough on Github.',
    component: pageStats
  },
  {
    url: '/animation-performance',
    title: 'Animation Performance',
    description: 'My notes on CSS animation performance in the browser.',
    component: pageCSSAnimations
  },
  {
    hide: true,
    url: '*',
    component: pageNotFound
  }
];

export const createRoutes = () => {
  const items = navigationItems.map((item, index) => {
    if (index === 0) {
      return <IndexRoute key={index} component={item.component} onEnter={dispatchEnterEvent} />;
    }

    return (
      <Route key={index} path={item.url} component={item.component} onEnter={dispatchEnterEvent} />
    );
  });

  return <Route path={baseRoute} component={base}>{items}</Route>;
};
