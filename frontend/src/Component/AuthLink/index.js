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
    const { classes, user } = this.props;

    return (
      <Fragment>
        {!user.isAuthenticated && (
          <Fragment>
            <Link to="/auth/login" style={{ marginLeft: 16 }}>
              Login
            </Link>
            <Link to="/auth/register" style={{ marginLeft: 16 }}>
              Register
            </Link>
          </Fragment>
        )}
        {user.isAuthenticated && (
          <Fragment>
            <a onClick={this._logout} style={{ marginLeft: 16 }}>
              Logout
            </a>
            {/* <a style={{ marginLeft: 16 }}>{user.data.name}</a> */}
            <img
              className={classes.avatar}
              src="http://i.pravatar.cc/50"
              alt="avatar"
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

AuthLink.propTypes = {
  classes: PropTypes.any,
  dispatch: PropTypes.any,
  notification: PropTypes.object,
  user: PropTypes.any,
};

const mapStateToProps = state => ({
  user: state.api.user,
});

export default compose(withNotification, connect(mapStateToProps, undefined))(
  withStyles(styles)(AuthLink),
);
