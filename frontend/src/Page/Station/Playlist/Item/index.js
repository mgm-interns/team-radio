import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { upVoteVideo, unUpVoteVideo } from 'Redux/api/currentStation/actions';
import styles from './styles';

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
class PlaylistItem extends Component {
  render() {
    const {
      thumbnail,
      name,
      score,
      singer,
      uploader,
      isUpvoted,
      playing,
      classes,
      upVoteVideo,
      id,
    } = this.props;
    return (
      <Grid
        container
        className={[classes.container, playing ? 'playing' : ''].reduce(
          (classesName, className) => (classesName += ` ${className}`),
        )}
      >
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className={classes.info}>
          <div className={classes.name}>{name}</div>
          <div className={classes.singer}>{singer}</div>
          <div className={classes.uploader}>Added by {uploader}</div>
        </Grid>
        <Grid item xs={2} className={classes.actions}>
          <IconButton
            onClick={() => upVoteVideo(id)}
            className={classes.action}
            color={isUpvoted ? 'primary' : 'default'}
          >
            star
          </IconButton>
          <div
            className={[classes.score, isUpvoted ? 'active' : ''].reduce(
              (classesName, className) => (classesName += ` ${className}`),
            )}
          >
            {score}
          </div>
        </Grid>
      </Grid>
    );
  }
}

PlaylistItem.propTypes = {
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  singer: PropTypes.string,
  uploader: PropTypes.string,
  id: PropTypes.string,
  isUpvoted: PropTypes.bool,
  playing: PropTypes.bool,
  theme: PropTypes.any,
  classes: PropTypes.any,
  upVoteVideo: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  upVoteVideo: videoId => dispatch(upVoteVideo({ videoId })),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  withStyles(styles),
)(PlaylistItem);
