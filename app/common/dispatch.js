import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    actions: bindActionCreators(actions, dispatch)
  });
};

export const bindState = (mapStateToProps) => {
  return connect(mapStateToProps, mapDispatchToProps)
};

// TODO: Fix this hack.
let _firstLoad = true;

export const dispatchEnterEvent = (nextState, replace, callback) => {
  if (_firstLoad) {
    _firstLoad = false;
    callback();
    return;
  }

  const detail = { nextState, replace, callback };
  const event = new CustomEvent('page-enter', { detail });
  window.dispatchEvent(event);
};
