import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import LinearProgress from 'material-ui/Progress/LinearProgress';
import withStyles from 'material-ui/styles/withStyles';
import ThumbUpIcon from 'react-icons/lib/md/thumb-up';
import ThumbDownIcon from 'react-icons/lib/md/thumb-down';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { Images } from 'Theme';
import { upVoteSong, downVoteSong } from 'Redux/api/currentStation/actions';
import { withNotification } from 'Component/Notification';
import { transformNumber } from 'Transformer';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class PlaylistItem extends Component {
  constructor(props) {
    super(props);

    // For improving UX
    this.state = {
      isUpVote: false,
      isDownVote: false,
      upVotes: 0,
      downVotes: 0,
    };

    this.upVoteSong = this.upVoteSong.bind(this);
    this.downVoteSong = this.downVoteSong.bind(this);
    this._onCreatorIconClicked = this._onCreatorIconClicked.bind(this);
  }

  componentDidMount() {
    const { up_vote, down_vote } = this.props;

    this.setState({
      isUpVote: PlaylistItem.isUpVote(this.props),
      isDownVote: PlaylistItem.isDownVote(this.props),
      upVotes: up_vote.length,
      downVotes: down_vote.length,
    });
  }

  // Always re-render upVote & downVote when props has changed
  componentWillReceiveProps(nextProps) {
    const { up_vote, down_vote } = nextProps;
    this.setState({
      isUpVote: PlaylistItem.isUpVote(nextProps),
      isDownVote: PlaylistItem.isDownVote(nextProps),
      upVotes: up_vote.length,
      downVotes: down_vote.length,
    });
  }

  upVoteSong() {
    const {
      upVoteSong,
      song_id,
      creator,
      userId,
      match: { params: { stationId } },
      isAuthenticated,
      notification,
    } = this.props;
    // Show warning message if not authenticated
    if (!isAuthenticated) {
      notification.app.warning({
        message: 'You need to login to use this feature.',
      });
      return;
    }
    if (userId === creator._id) {
      notification.app.warning({
        message: 'You cannot up vote your song',
      });
      return;
    }
    // If authenticated
    const { isDownVote, isUpVote } = this.state;
    upVoteSong({ songId: song_id, userId, stationId });
    this.setState({
      isUpVote: !isUpVote,
      isDownVote: isUpVote ? isDownVote : false,
      upVotes: this.state.upVotes + (isUpVote ? -1 : 1),
      downVotes: this.state.downVotes + (isDownVote ? -1 : 0),
    });
  }

  downVoteSong() {
    const {
      downVoteSong,
      song_id,
      userId,
      match: { params: { stationId } },
      isAuthenticated,
      notification,
    } = this.props;
    // Show warning message if not authenticated
    if (!isAuthenticated) {
      notification.app.warning({
        message: 'You need to login to use this feature.',
      });
      return;
    }
    // If authenticated
    const { isDownVote, isUpVote } = this.state;
    downVoteSong({ songId: song_id, userId, stationId });
    this.setState({
      isDownVote: !isDownVote,
      isUpVote: isDownVote ? isUpVote : false,
      upVotes: this.state.upVotes + (isUpVote ? -1 : 0),
      downVotes: this.state.downVotes + (isDownVote ? -1 : 1),
    });
  }

  static isUpVote(props) {
    const { up_vote, userId } = props;
    for (let i = 0; i < up_vote.length; i++) {
      if (up_vote[i] === userId) return true;
    }
    return false;
  }

  static isDownVote(props) {
    const { down_vote, userId } = props;
    for (let i = 0; i < down_vote.length; i++) {
      if (down_vote[i] === userId) return true;
    }
    return false;
  }

  static getScoreRatio(upVotes = 0, downVotes = 0) {
    // Handle divide by zero
    if (downVotes === 0) {
      if (upVotes === downVotes) return 50;
      return 100;
    }
    // Default case
    return upVotes / (upVotes + downVotes) * 100;
  }

  _onCreatorIconClicked(event) {
    event.preventDefault();
    const { notification } = this.props;
    notification.app.warning({
      message: 'This feature is not ready yet!',
    });
  }

  render() {
    const {
      song_id,
      thumbnail,
      title,
      playing,
      classes,
      creator,
      duration,
      willBeSkipped,
    } = this.props;

    return (
      <Grid container className={classNames(classes.container, { playing })}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
          <div className={classes.duration}>
            <span className={classes.durationText}>
              {transformNumber.millisecondsToTime(duration)}
            </span>
          </div>
        </Grid>
        <Grid item xs={9} className={classes.info}>
          <Tooltip placement={'bottom'} title={title}>
            <div className={classes.name}>{title}</div>
          </Tooltip>
          <Tooltip
            placement={'bottom'}
            title={'This song will be skipped when player starts it.'}
          >
            <div className={classes.warningText}>
              {willBeSkipped && 'Will be skipped'}
            </div>
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
        {song_id && (
          <div className={classes.actions}>
            <div className={classes.actionsWrapper}>
              <IconButton
                onClick={this.upVoteSong}
                className={classNames(classes.action, {
                  [classes.disabledAction]: !this.state.isUpVote,
                })}
                color={'primary'}
              >
                <ThumbUpIcon />
              </IconButton>
              <div className={classes.score}>{this.state.upVotes}</div>
              <IconButton
                onClick={this.downVoteSong}
                className={classNames(classes.action, {
                  [classes.disabledAction]: !this.state.isDownVote,
                })}
                color={'primary'}
              >
                <ThumbDownIcon />
              </IconButton>
              <div className={classes.score}>{this.state.downVotes}</div>
            </div>
            <div className={classes.scoreRatio}>
              <Tooltip
                placement={'bottom'}
                title={`${this.state.upVotes} / ${this.state.downVotes}`}
              >
                <LinearProgress
                  className={classes.progressBar}
                  color={'primary'}
                  mode={'determinate'}
                  value={PlaylistItem.getScoreRatio(
                    this.state.upVotes,
                    this.state.downVotes,
                  )}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </Grid>
    );
  }
}

PlaylistItem.propTypes = {
  classes: PropTypes.any,
  song_id: PropTypes.any,
  playing: PropTypes.bool,
  score: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  creator: PropTypes.object,
  name: PropTypes.string,
  theme: PropTypes.any,
  upVoteSong: PropTypes.func,
  downVoteSong: PropTypes.func,
  up_vote: PropTypes.array,
  down_vote: PropTypes.array,
  willBeSkipped: PropTypes.bool,
  duration: PropTypes.number,
  userId: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  match: PropTypes.any,
  notification: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  userId: api.user.data.userId,
  isAuthenticated: api.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  upVoteSong: option => dispatch(upVoteSong(option)),
  downVoteSong: option => dispatch(downVoteSong(option)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
  withNotification,
)(PlaylistItem);
