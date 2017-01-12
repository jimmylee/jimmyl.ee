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
  n => {
    const url = baseRoute;
    const title = 'Foreword';
    const emojis = ['🙂', '🙃', '😉'];
    const description = 'This is my internet archive of project history, research, and experiments.';
    const component = decorateComponentWithProps(pageHome, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/site-analysis';
    const title = 'Site Analysis';
    const emojis = ['🚶', '🏃', '⛹'];
    const description = (
      <span>This project uses <a href="https://github.com/meanJim/dough">Dough</a> on <a href="https://github.com/">GitHub</a>. No credit is necessary if you use it.</span>
    );
    const component = decorateComponentWithProps(pageStats, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/animation-performance';
    const title = 'Performant CSS Animations';
    const emojis = ['🐬', '🐳', '🐋'];
    const description = 'My understanding of CSS animation performance in the browser.';
    const component = decorateComponentWithProps(pageCSSAnimations, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/writing-css';
    const title = 'Performant CSS';
    const emojis = ['🌱', '🌿', '🌾'];
    const description = 'A set of tactics to ensure fast CSS Object Model creation.';
    const component = decorateComponentWithProps(pageWritingCSS, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '*';
    const hide = true;
    const component = pageNotFound;

    return { component, hide, url };
  }
];

export const createRoutes = () => {
  const items = navigationItems.map((each, index) => {
    const { component, url } = each();

    if (index === 0) {
      return <IndexRoute key={index} component={component} onEnter={dispatchEnterEvent} />;
    }

    return (
      <Route key={index} path={url} component={component} onEnter={dispatchEnterEvent} />
    );
  });

  return <Route path={baseRoute} component={base}>{items}</Route>;
};
