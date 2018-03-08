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
import styles from './styles';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this._renderMessages = this._renderMessages.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleSendMessage = this._handleSendMessage.bind(this);
  }

  _renderMessages() {
    const { classes, chatContent, user } = this.props;

    return (
      <List component={'div'} disablePadding>
        {chatContent.map(({ sender, message }, index) => (
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

  _onChange(e) {
    const result = e.target.value;
    this.setState({ message: result });
  }

  /* eslint-disable no-shadow */
  _handleSendMessage() {
    const {
      user: { userId },
      station: { station_id },
      addStationChat,
    } = this.props;
    const { message } = this.state;

    addStationChat({ userId, stationId: station_id, message });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.chatboxContainer}>
        <Grid item xs={12} className={classes.chatboxBody}>
          <div>{this._renderMessages()}</div>
          <Grid container className={classes.messageInputContainer}>
            <Grid item xs={10} className={classes.inputStyle}>
              <TextField
                id={'message'}
                name={'message'}
                placeholder={'Type a message here'}
                fullWidth
                multiline
                className={classes.messageTextField}
                onChange={this._onChange}
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
    );
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object,
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
  connect(mapStateToProps, mapDispatchToProps),
)(ChatBox);
