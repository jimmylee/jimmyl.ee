import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';

const mapDispatchToProps = dispatch => {
  return Object.assign(
    {},
    {
      actions: bindActionCreators(actions, dispatch),
    }
  );
};

export const bindState = mapStateToProps => {
  return connect(mapStateToProps, mapDispatchToProps);
};
