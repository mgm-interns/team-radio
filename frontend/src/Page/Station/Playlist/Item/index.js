import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { upVoteSong, downVoteSong } from 'Redux/api/currentStation/actions';
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
      score: 0,
    };

    this.upVoteSong = this.upVoteSong.bind(this);
    this.downVoteSong = this.downVoteSong.bind(this);
  }

  componentDidMount() {
    const { up_vote, down_vote } = this.props;

    this.setState({
      isUpVote: PlaylistItem.isUpVote(this.props),
      isDownVote: PlaylistItem.isDownVote(this.props),
      score: up_vote.length - down_vote.length,
    });
  }

  // Always re-render upVote & downVote when props has changed
  componentWillReceiveProps(nextProps) {
    const { up_vote, down_vote } = nextProps;
    this.setState({
      isUpVote: PlaylistItem.isUpVote(nextProps),
      isDownVote: PlaylistItem.isDownVote(nextProps),
      score: up_vote.length - down_vote.length,
    });
  }

  upVoteSong() {
    const {
      upVoteSong,
      song_id,
      userId,
      match: { params: { stationId } },
    } = this.props;
    const { isDownVote, isUpVote } = this.state;
    upVoteSong({ songId: song_id, userId, stationId });
    this.setState({
      isUpVote: !isUpVote,
      isDownVote: isUpVote ? isDownVote : false,
    });
  }

  downVoteSong() {
    const {
      downVoteSong,
      song_id,
      userId,
      match: { params: { stationId } },
    } = this.props;
    const { isDownVote, isUpVote } = this.state;
    downVoteSong({ songId: song_id, userId, stationId });
    this.setState({
      isDownVote: !isDownVote,
      isUpVote: isDownVote ? isUpVote : false,
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

  render() {
    const { thumbnail, title, singer, playing, classes } = this.props;

    return (
      <Grid container className={classNames(classes.container, { playing })}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className={classes.info}>
          <div className={classes.name}>{title}</div>
          <div className={classes.singer}>{singer}</div>
          {/* <div className={classes.uploader}>Added by {uploader}</div> */}
        </Grid>
        <Grid item xs={2} className={classes.actions}>
          <IconButton
            onClick={this.upVoteSong}
            className={classes.action}
            color={this.state.isUpVote ? 'primary' : 'default'}
          >
            arrow_drop_up
          </IconButton>
          <div className={classes.score}>{this.state.score}</div>
          <IconButton
            onClick={this.downVoteSong}
            className={classes.action}
            color={this.state.isDownVote ? 'primary' : 'default'}
          >
            arrow_drop_down
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

PlaylistItem.propTypes = {
  classes: PropTypes.any,
  song_id: PropTypes.any,
  playing: PropTypes.bool,
  score: PropTypes.number,
  singer: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  uploader: PropTypes.string,
  name: PropTypes.string,
  theme: PropTypes.any,
  upVoteSong: PropTypes.func,
  downVoteSong: PropTypes.func,
  up_vote: PropTypes.array,
  down_vote: PropTypes.array,
  userId: PropTypes.any,
  match: PropTypes.any,
};

const mapStateToProps = ({ api }) => ({
  userId: api.user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  upVoteSong: option => dispatch(upVoteSong(option)),
  downVoteSong: option => dispatch(downVoteSong(option)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(PlaylistItem);
