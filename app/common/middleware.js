import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';

const reduxRouterMiddleware = syncHistory( browserHistory );

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware
)(createStore);

export default {
  createStore: createStoreWithMiddleware,
  history: browserHistory
};
