import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import MdSend from 'react-icons/lib/md/send';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { addStationChat } from 'Redux/api/currentStation/actions';
import { withNotification } from 'Component/Notification';
import trim from 'lodash/trim';
import styles from './styles';

const MESSAGE_MAX_LENGTH = 200;

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this._renderMessages = this._renderMessages.bind(this);
    this._handleSendMessage = this._handleSendMessage.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _renderMessages() {
    const { classes, chatContent, user } = this.props;

    return (
      <List component={'div'} disablePadding className={classes.chatList}>
        {chatContent.map(({ sender = {}, message }, index) => (
          <ListItem
            key={index}
            className={classNames(
              classes.messageListItem,
              sender._id === user.userId
                ? classes.currentUser
                : classes.otherUsers,
            )}
          >
            {sender._id !== user.userId ? (
              <Avatar
                alt={sender.name}
                src={sender.avatar_url}
                className={classes.userAvatar}
              />
            ) : null}
            <div className={classes.messageContainer}>
              {sender._id !== user.userId ? (
                <p className={classes.username}>{sender.name}</p>
              ) : null}
              <p
                className={classNames(classes.messages, {
                  [classes.otherMessagesBackground]: sender._id !== user.userId,
                  [classes.currentUserMessageBackground]:
                    sender._id === user.userId,
                })}
              >
                {message}
              </p>
            </div>
          </ListItem>
        ))}
      </List>
    );
  }

  _handleSendMessage() {
    const {
      notification,
      user: { userId },
      station: { station_id },
      addStationChat, // eslint-disable-line no-shadow
    } = this.props;

    let { message } = this.state;

    // Trim message content to make sure there are no redundancy space characters
    message = trim(message);

    // Make sure that message is not empty
    if (message) {
      if (userId) {
        addStationChat({ userId, stationId: station_id, message });

        // Reset message
        this.setState({ message: '' });
      } else {
        notification.app.warning({
          message: 'You need to login to use this feature.',
        });
      }
    }
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this._handleSendMessage();
    }
  }

  _handleOnChange(e) {
    const message = `${e.target.value}`.substr(0, MESSAGE_MAX_LENGTH);

    this.setState({ message });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.chatboxContainer}>
        <Grid item xs={12} className={classes.chatboxBody}>
          <Grid container>
            <Grid item xs={12}>
              {this._renderMessages()}
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.messageInputContainer}>
                <Grid item xs={10} className={classes.inputStyle}>
                  <TextField
                    id={'message'}
                    name={'message'}
                    placeholder={'Type a message here'}
                    fullWidth
                    multiline
                    className={classes.messageTextField}
                    value={this.state.message}
                    onKeyDown={this._handleKeyDown}
                    onChange={this._handleOnChange}
                  />
                </Grid>
                <Grid item xs={2} className={classes.inputActionsContainer}>
                  <IconButton onClick={this._handleSendMessage}>
                    <MdSend />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object,
  notification: PropTypes.object,
  chatContent: PropTypes.array,
  user: PropTypes.object,
  station: PropTypes.object,
  addStationChat: PropTypes.func,
};

const mapStateToProps = ({ api: { currentStation, user } }) => ({
  chatContent: currentStation.chat,
  user: user.data,
  station: currentStation.station,
});

const mapDispatchToProps = dispatch => ({
  addStationChat: ({ userId, stationId, message }) =>
    dispatch(addStationChat({ userId, stationId, message })),
});

export default compose(
  withStyles(styles),
  withNotification,
  connect(mapStateToProps, mapDispatchToProps),
)(ChatBox);
