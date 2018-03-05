import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import PersonIcon from 'react-icons/lib/md/person';
import ExitIcon from 'react-icons/lib/md/exit-to-app';
import ArrowDropDownIcon from 'react-icons/lib/md/arrow-drop-down';
import HelpIcon from 'react-icons/lib/md/help';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import { withNotification } from 'Component/Notification';
import { removeAuthenticationState } from 'Configuration';
import { logout } from 'Redux/api/user/user';
import { Images } from 'Theme';

import styles from './styles';

class AuthLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
    this._logout = this._logout.bind(this);
    this._help = this._help.bind(this);
    this._renderPopoverContent = this._renderPopoverContent.bind(this);
  }

  _logout() {
    const { notification } = this.props;
    notification.app.warning({
      message: `Logout your account!`,
    });
    removeAuthenticationState();
    this.props.logout();
    // this.props.history.replace('/');
  }

  _help() {}

  _openMenu = event => {
    this.setState({ anchorEl: event.target });
  };

  _closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  _renderPopoverContent() {
    const { user, classes } = this.props;
    return (
      <List
        subheader={
          <ListSubheader>
            {`Signed in as:`}
            <Typography type="body1">
              {`${user.data.username || user.data.email}`}
            </Typography>
          </ListSubheader>
        }
      >
        <Divider style={{ marginTop: 12 }} />
        <Link
          className={classes.profileLink}
          to={`/profile/${user.data.username}`}
        >
          <ListItem button>
            <PersonIcon />
            <ListItemText primary="Your profile" />
          </ListItem>
        </Link>

        <Link className={classes.profileLink} to={`/help`}>
          <ListItem button>
            <HelpIcon />
            <ListItemText primary="Help" />
          </ListItem>
        </Link>

        <ListItem button onClick={this._logout}>
          <ExitIcon />
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    );
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

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
          <div className={classes.menuItem}>
              <div>
                  <span className={classes.displayName}>Reputation: {user.data.reputation || 0}</span>
              </div>
            <Link
              to={`/profile/${user.data.username}`}
              className={classes.menuItem}
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
              <div>
                <span className={classes.displayName}>{user.data.name}</span>
              </div>
            </Link>
            <div
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this._openMenu}
            >
              <span>
                <IconButton className={classes.dropdownIcon}>
                  <ArrowDropDownIcon />
                </IconButton>
              </span>
            </div>

            <Popover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this._closeMenu}
            >
              {this._renderPopoverContent()}
            </Popover>
          </div>
        )}
      </Fragment>
    );
  }
}

AuthLink.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.any,
  notification: PropTypes.object,
  user: PropTypes.any,
  history: PropTypes.object,
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
