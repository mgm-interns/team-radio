import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { transformNumber } from 'Transformer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from 'react-router-dom/withRouter';
import { addSong } from 'Redux/api/currentStation/actions';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import ReplayIcon from 'react-icons/lib/md/replay';
import { withNotification } from 'Component/Notification';
import { Images } from 'Theme';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class HistoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replay: false,
    };

    this._onReplayClick = this._onReplayClick.bind(this);
    this._onCreatorIconClicked = this._onCreatorIconClicked.bind(this);
  }

  _onReplayClick() {
    const {
      notification,
      addSong,
      match: { params: { stationId } },
      user: { userId, username, name, avatar_url },
      url,
      title,
      thumbnail,
    } = this.props;

    // Check if user is not authenticated
    if (!userId) {
      notification.app.warning({
        message: 'Unregistered user is not allowed to do this.',
      });
      return;
    }

    addSong({
      songUrl: url,
      title,
      thumbnail,
      stationId,
      userId,
      creator: { username, name, avatar_url },
    });
  }

  _onCreatorIconClicked(event) {
    event.preventDefault();
    const { notification } = this.props;
    notification.app.warning({
      message: 'This feature is not ready yet!',
    });
  }

  render() {
    const { thumbnail, title, creator, duration, classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} />
          <div className={classes.duration}>
            <span className={classes.durationText}>
              {transformNumber.millisecondsToTime(duration)}
            </span>
          </div>
        </Grid>
        <Grid item xs={8} className={classes.info}>
          <Tooltip placement={'bottom'} title={title}>
            <div className={classes.name}>{title}</div>
          </Tooltip>
          <div className={classes.creator}>
            Added by
            {creator === null ? (
              ' Unregistered User'
            ) : (
              <Tooltip placement={'bottom'} title={creator.name}>
                <img
                  src={creator.avatar_url || Images.avatar.male01}
                  className={classes.creatorAvatar}
                  onClick={this._onCreatorIconClicked}
                />
              </Tooltip>
            )}
          </div>
        </Grid>
        <Grid item xs={1} className={classes.actions}>
          <Tooltip placement={'bottom'} title={`Replay this song`}>
            <IconButton
              className={classes.action}
              color="default"
              onClick={this._onReplayClick}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  classes: PropTypes.any,
  url: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  duration: PropTypes.number,
  creator: PropTypes.object,
  addSong: PropTypes.func,
  match: PropTypes.any,
  user: PropTypes.object,
  replayRequest: PropTypes.func,
  notification: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  user: api.user.data,
});

const mapDispatchToProps = dispatch => ({
  addSong: option => dispatch(addSong(option)),
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withNotification,
)(HistoryItem);
