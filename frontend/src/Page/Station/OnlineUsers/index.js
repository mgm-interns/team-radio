import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import classNames from 'classnames';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Images } from 'Theme';
import CircleIcon from 'react-icons/lib/fa/circle';
import { withNotification } from 'Component/Notification';
import styles from './styles';

class OnlineUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchor: null,
      tooltip: false,
    };

    this._openPopover = this._openPopover.bind(this);
    this._closePopover = this._closePopover.bind(this);
    this._openTooltip = this._openTooltip.bind(this);
    this._closeTooltip = this._closeTooltip.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.renderPopoverContent = this.renderPopoverContent.bind(this);
  }

  _openPopover(event) {
    this.setState({
      open: true,
      anchor: event.target,
    });
  }

  _closePopover() {
    this.setState({ open: false }, () => {
      this.setState({ copied: false, anchor: null });
    });
  }

  _openTooltip() {
    this.setState({
      tooltip: true,
    });
  }

  _closeTooltip() {
    this.setState({
      tooltip: false,
    });
  }

  _onItemClick({ username }) {
    const { currentUser, history } = this.props;
    if (currentUser.username === username) {
      history.push(`/profile/${username}`);
      return;
    }

    this.props.notification.app.warning({
      message: 'This feature is not ready yet.',
    });
  }

  renderPopoverContent() {
    const {
      classes,
      currentStation: { users = [], online_count },
      currentUser,
    } = this.props;
    // Only display keep top 10 users
    const filteredUsers = users.sort(
      user => (user.username === currentUser.username ? 1 : 0),
    );
    // Group the rest people to anonymous group
    const anonymousUsers = online_count - filteredUsers.length;
    return (
      <List disablePadding>
        {filteredUsers.map(({ name, username, avatar_url }, index) => (
          <ListItem
            key={index}
            dense
            button
            className={classNames(classes.listItem, {
              [classes.activeListItem]: username === currentUser.username,
            })}
            onClick={() => this._onItemClick({ name, username, avatar_url })}
          >
            <Avatar
              src={avatar_url || Images.avatar.male01}
              className={classes.userAvatar}
            />
            <ListItemText
              primary={
                currentUser.username === username ? 'You' : name || 'Unknown'
              }
            />
          </ListItem>
        ))}
        {anonymousUsers > 0 && (
          <ListItem dense className={classes.listItem}>
            <ListItemAvatar className={classes.userAvatar}>
              <div className={classes.anonymousImage}>{anonymousUsers}</div>
            </ListItemAvatar>
            <ListItemText primary={`Unregistered users`} />
          </ListItem>
        )}
      </List>
    );
  }

  renderTooltip() {
    const {
      classes,
      currentStation: { users = [], online_count },
      currentUser,
    } = this.props;
    // Only display keep top 10 users
    const filteredUsers = users.filter((user, index) => index < 10);
    // Group the rest people to anonymous group
    const anonymousUsersCount = online_count - filteredUsers.length;
    if (filteredUsers.length === 0) {
      // In loading phrase because there is no user in this phrase
      return null;
    }
    return (
      <div className={classes.tooltip}>
        {filteredUsers.map(({ name, username }) => (
          <Typography
            key={username}
            type={'body1'}
            className={classes.tooltipItem}
          >
            {currentUser.username === username ? 'You' : name}
          </Typography>
        ))}
        {anonymousUsersCount > 0 && (
          <Typography type={'body1'} className={classes.tooltipItem}>
            and {anonymousUsersCount} more...
          </Typography>
        )}
      </div>
    );
  }

  render() {
    const { classes, currentStation: { online_count } } = this.props;
    return [
      <div
        key={1}
        className={classes.onlineCountContainer}
        onClick={this._openPopover}
        onMouseOver={this._openTooltip}
        onMouseOut={this._closeTooltip}
      >
        <CircleIcon className={classes.onlineIcon} />
        <Typography
          type={'caption'}
          align={'left'}
          className={classes.stationOnlineCountText}
        >
          {online_count || '0'} online
        </Typography>
        {this.state.tooltip && this.renderTooltip()}
      </div>,
      <Popover
        key={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={classes.popover}
        open={this.state.open}
        anchorEl={this.state.anchor}
        onClose={this._closePopover}
      >
        {this.renderPopoverContent()}
      </Popover>,
    ];
  }
}

OnlineUsers.propTypes = {
  classes: PropTypes.object,
  currentStation: PropTypes.object,
  notification: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.any,
};

OnlineUsers.defaultProps = {
  currentUser: {},
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
  currentUser: api.user.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withNotification,
  withRouter,
)(OnlineUsers);
