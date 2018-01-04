import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import { withNotification } from 'Component/Notification';
import fixture from 'Fixture/landing';
import { loadAuthenticationState, removeAuthenticationState } from 'Config';
import { logout } from 'Redux/api/user/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styles from './styles';

class AuthLink extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  _logout() {
    const { notification } = this.props;
    notification.app.warning({
      message: `Logout your account!`,
    });
    removeAuthenticationState();
    this.props.dispatch(logout());
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {!loadAuthenticationState() && (
          <Fragment>
            <Link to="/auth/login" style={{ marginLeft: 16 }}>
              Login
            </Link>
            <Link to="/auth/register" style={{ marginLeft: 16 }}>
              Register
            </Link>
          </Fragment>
        )}
        {loadAuthenticationState() && (
          <a onClick={this._logout} style={{ marginLeft: 16 }}>
            Logout
          </a>
        )}
      </div>
    );
  }
}

AuthLink.propTypes = {
  dispatch: PropTypes.any,
  notification: PropTypes.object,
};

export default compose(withNotification, connect(undefined, undefined))(
  AuthLink,
);
