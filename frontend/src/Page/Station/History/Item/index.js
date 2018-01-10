import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class HistoryItem extends Component {
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
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  classes: PropTypes.any,
  song_id: PropTypes.any,
  playing: PropTypes.bool,
  score: PropTypes.number,
  singer: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  uploader: PropTypes.string,
  name: PropTypes.string,
};

export default withStyles(styles)(HistoryItem);
