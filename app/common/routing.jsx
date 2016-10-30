import React from 'react';
import base from '../components/base/index';

import { dispatchEnterEvent } from '../common/dispatch';
import { decorateComponentWithProps } from '../common/react';
import { Route, IndexRoute } from 'react-router';

import pageWritingCSS from '../pages/writing-css/index';
import pageCSSAnimations from '../pages/css-animations/index';
import pageHome from '../pages/home/index';
import pageNotFound from '../pages/not-found/index';
import pageStats from '../pages/site-stats/index';

export const baseRoute = '/';
export const navigationItems = [
  (n => {
    const url = baseRoute;
    const title = 'Foreword';
    const description = 'This is a web application for sharing experiments and research.';
    const component = decorateComponentWithProps(pageHome, { description });

    return { component, description, title, url };
  })(),
  (n => {
    const url = '/site-analysis';
    const title = 'Site Analysis';
    const description = <span>This project uses <a href="https://github.com/meanJim/dough">Dough</a> on <a href="https://github.com/">GitHub</a>.</span>;
    const component = decorateComponentWithProps(pageStats, { description });

    return { component, description, title, url };
  })(),
  (n => {
    const url = '/animation-performance';
    const title = 'Performant CSS Animations';
    const description = 'CSS animation performance in the browser.';
    const component = decorateComponentWithProps(pageCSSAnimations, { description });

    return { component, description, title, url };
  })(),
  (n => {
    const url = '/writing-css';
    const title = 'Performant CSS';
    const description = 'Writing performant CSS creation for your web application.';
    const component = decorateComponentWithProps(pageWritingCSS, { description });

    return { component, description, title, url };
  })(),
  (n => {
    const url = '*';
    const hide = true;
    const component = pageNotFound;

    return { component, hide, url };
  })()
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
