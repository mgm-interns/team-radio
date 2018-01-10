import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNotification } from 'Component/Notification';
import { removeAuthenticationState } from 'Config';
import { logout } from 'Redux/api/user/actions';
import { Images } from 'Theme';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';

import styles from './styles';

class AuthLink extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
    this.state = {
      anchorEl: null,
    };
  }

  _logout() {
    const { notification } = this.props;
    notification.app.warning({
      message: `Logout your account!`,
    });
    removeAuthenticationState();
    this.props.dispatch(logout());
  }

  _handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  _handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, user } = this.props;

    const { anchorEl } = this.state;

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
          <div>
            <div
              className={classes.menuItem}
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this._handleClick}
            >
              <img
                className={classes.avatar}
                src={Images.avatar.default}
                alt="avatar"
              />
              <Icon className={classes.dropdownIcon}>arrow_drop_down</Icon>
            </div>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this._handleClose}
            >
              <MenuItem>{user.data.name}</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>
                <a onClick={this._logout}>Logout</a>
              </MenuItem>
            </Menu>
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
