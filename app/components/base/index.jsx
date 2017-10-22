import React from 'react';
import Navigation from '../navigation/index.jsx';

import { compose } from 'redux';
import { navigationItems } from '../../common/routing';
import { withRouter } from 'react-router';

class Base extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="base">
        <Navigation
          currentPath={this.props.location.pathname}
          history={this.props.history}
          links={navigationItems}
        />
        <div className="base-content">
          {children}
        </div>
        <div className="base-spacer" />
      </div>
    );
  }
}

export default compose(withRouter)(Base);
