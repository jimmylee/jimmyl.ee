import React from 'react';
import base from '../components/base/index';

import { decorateComponentWithProps } from '../common/react';
import { Switch, Route } from 'react-router';

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
    const description = 'This is just a document on the web.';
    const component = decorateComponentWithProps(pageHome, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/site-analysis';
    const title = 'Site Analysis';
    const emojis = ['🚶', '🏃', '⛹'];
    const description = (
      <span>
        This project uses a repository called
        {' '}
        <a href="https://github.com/jimmylee/dough">Dough</a>.
      </span>
    );
    const component = decorateComponentWithProps(pageStats, { description });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/animation-performance';
    const title = 'Performant CSS Animations';
    const emojis = ['🐬', '🐳', '🐋'];
    const description =
      'My understanding of CSS animation performance in the browser.';
    const component = decorateComponentWithProps(pageCSSAnimations, {
      description,
    });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '/writing-css';
    const title = 'Performant CSS';
    const emojis = ['🌱', '🌿', '🌾'];
    const description =
      'A set of tactics to ensure fast CSS Object Model creation.';
    const component = decorateComponentWithProps(pageWritingCSS, {
      description,
    });

    return { component, description, emojis, title, url };
  },
  n => {
    const url = '*';
    const hide = true;
    const component = pageNotFound;

    return { component, hide, url };
  },
];

export const createRoutes = () => {
  const items = navigationItems.map((each, index) => {
    const { component, url } = each();

    if (index === 0) {
      return <Route exact key={index} path="/" component={component} />;
    }

    return <Route key={index} path={url} component={component} />;
  });

  return <Switch>{items}</Switch>;
};
