import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { upVoteVideo, unUpVoteVideo } from '../../../../Redux/api/currentStation/actions';

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
      <Grid container className={[classes.container, playing && 'playing']}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className={classes.info}>
          <Grid className={classes.name}>{name}</Grid>
          <Grid className={classes.singer}>{singer}</Grid>
          <Grid className={classes.uploader}>Added by {uploader}</Grid>
        </Grid>
        <Grid item xs={2} className={classes.actions}>
          <IconButton
            onClick={() => upVoteVideo(id)}
            className={classes.action}
            color={isUpvoted ? 'primary' : 'secondary'}
          >
            star
          </IconButton>
          <Grid className={[classes.score, isUpvoted && 'active']}>
            {score}
          </Grid>
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
