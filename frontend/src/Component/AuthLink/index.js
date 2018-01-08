import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { withNotification } from 'Component/Notification';
import { loadAuthenticationState, removeAuthenticationState } from 'Config';
import { logout } from 'Redux/api/user/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Icon from 'material-ui/Icon';
import classNames from 'classnames';

import styles from './styles';

class AuthLink extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
    this._triggerDropdown = this._triggerDropdown.bind(this);
    this.state = {
      show: false,
    };
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

  _triggerDropdown() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Fragment>
        {!user.isAuthenticated && (
          <Fragment>
            <Link to="/auth/login" className={classes.navItem}>
              Login
            </Link>
            <Link to="/auth/register" className={classes.navItem}>
              Register
            </Link>
          </Fragment>
        )}
        {user.isAuthenticated && (
          <div className={classes.dropdown}>
            <div className={classes.menuItem} onClick={this._triggerDropdown}>
              <img
                className={classes.avatar}
                src="http://i.pravatar.cc/50"
                alt="avatar"
              />
              <Icon className={classes.dropdownIcon}>arrow_drop_down</Icon>
            </div>
            <div
              className={classNames([classes.dropdownContent], {
                [classes.show]: this.state.show,
              })}
            >
              <a>{user.data.name}</a>
              <a>My Profile</a>
              <a onClick={this._logout}>Logout</a>
            </div>
          </div>
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
