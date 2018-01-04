import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { upVoteSong, downVoteSong } from 'Redux/api/currentStation/actions';
import styles from './styles';

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
class PlaylistItem extends Component {
  render() {
    const {
      thumbnail,
      title,
      score,
      singer,
      uploader,
      isUpvoted,
      playing,
      classes,
      upVoteSong,
      downVoteSong,
      id,
    } = this.props;
    return (
      <Grid container className={classNames(classes.container, { playing })}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className={classes.info}>
          <div className={classes.name}>{title}</div>
          <div className={classes.singer}>{singer}</div>
          <div className={classes.uploader}>Added by {uploader}</div>
        </Grid>
        <Grid item xs={2} className={classes.actions}>
          <IconButton
            onClick={() => upVoteSong(id)}
            className={classes.action}
            color={isUpvoted ? 'primary' : 'default'}
          >
            arrow_drop_up
          </IconButton>
          <div className={classNames(classes.score, { active: isUpvoted })}>
            {score}
          </div>
          <IconButton
            onClick={() => downVoteSong(id)}
            className={classes.action}
            color={isUpvoted ? 'primary' : 'default'}
          >
            arrow_drop_down
          </IconButton>
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
  upVoteSong: PropTypes.func,
  downVoteSong: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  upVoteSong: songId => dispatch(upVoteSong({ songId })),
  downVoteSong: songId => dispatch(downVoteSong({ songId })),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  withStyles(styles),
)(PlaylistItem);
