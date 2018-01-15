import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';
import Tooltip from 'material-ui/Tooltip';
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
    };

    this._openPopover = this._openPopover.bind(this);
    this._closePopover = this._closePopover.bind(this);
    this._togglePopover = this._togglePopover.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  _togglePopover(event) {
    this.setState({
      open: !this.state.open,
      anchor: this.state.open ? event.target : null,
    });
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

  _onItemClick(user) {
    this.props.notification.app.warning({
      message: 'This feature is not ready yet.',
    });
    console.log('Click on', user);
  }

  renderUsersList() {
    const {
      classes,
      currentStation: { users = [], online_count },
    } = this.props;
    // Only display keep top 10 users
    const filteredUsers = users.filter((user, index) => index < 10);
    // Group the rest people to anonymous group
    const anonymousUsers = online_count - filteredUsers.length;
    return (
      <List disablePadding>
        {filteredUsers.map(({ name, username, avatar_url }, index) => (
          <ListItem
            key={index}
            dense
            button
            className={classes.listItem}
            onClick={() => this._onItemClick({ name, username, avatar_url })}
          >
            <Avatar
              src={avatar_url || Images.avatar.male01}
              className={classes.userAvatar}
            />
            <ListItemText primary={name} />
          </ListItem>
        ))}
        {anonymousUsers !== 0 && (
          <ListItem dense className={classes.listItem}>
            <ListItemAvatar className={classes.userAvatar}>
              <div className={classes.anonymousImage}>{anonymousUsers}</div>
            </ListItemAvatar>
            <ListItemText primary={`Others...`} />
          </ListItem>
        )}
      </List>
    );
  }

  render() {
    const { classes, currentStation: { online_count } } = this.props;
    return [
      <Tooltip
        key={1}
        placement={'bottom'}
        title={'Press to see who is online.'}
      >
        <div
          className={classes.onlineCountContainer}
          onClick={this._openPopover}
        >
          <CircleIcon className={classes.onlineIcon} />
          <Typography
            type={'caption'}
            align={'left'}
            className={classes.stationOnlineCountText}
          >
            {online_count || '0'} online
          </Typography>
        </div>
      </Tooltip>,
      <Popover
        key={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={this.state.open}
        anchorEl={this.state.anchor}
        onClose={this._closePopover}
      >
        {this.renderUsersList()}
      </Popover>,
    ];
  }
}

OnlineUsers.propTypes = {
  classes: PropTypes.object,
  currentStation: PropTypes.object,
  notification: PropTypes.object,
};

OnlineUsers.defaultProps = {};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation,
  userId: api.user.data.userId,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withNotification,
)(OnlineUsers);
