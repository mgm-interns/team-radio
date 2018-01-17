import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Menu from 'material-ui/Menu';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { withNotification } from 'Component/Notification';
import { removeAuthenticationState } from 'Configuration';
import { logout } from 'Redux/api/user/actions';
import { Images } from 'Theme';

import styles from './styles';

class AuthLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
    this._logout = this._logout.bind(this);
  }

  _logout() {
    const { notification } = this.props;
    notification.app.warning({
      message: `Logout your account!`,
    });
    removeAuthenticationState();
    this.props.logout();
    this.props.history.replace('/');
  }

  _openMenu = event => {
    this.setState({ anchorEl: event.target });
  };

  _closeMenu = () => {
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
              onClick={this._openMenu}
            >
              <img
                className={classes.avatar}
                src={
                  !user.data.avatar_url
                    ? Images.avatar.male01
                    : user.data.avatar_url
                }
                alt="avatar"
              />
              <Icon className={classes.dropdownIcon}>arrow_drop_down</Icon>
            </div>

            <Menu
              id="simple-menu"
              className={classes.menuPopover}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this._closeMenu}
            >
              <List
                subheader={
                  <ListSubheader>{`Signed in as: ${user.data.username ||
                    user.data.email}`}</ListSubheader>
                }
              >
                <Link
                  className={classes.profileLink}
                  to={`/profile/${user.data.username}`}
                >
                  <ListItem>
                    <ListItemIcon>
                      <Icon>personal</Icon>
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </Link>

                <ListItem button onClick={this._logout}>
                  <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
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
  history: PropTypes.any,
  navigateToProfile: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.api.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNotification,
  withRouter,
)(withStyles(styles)(AuthLink));
