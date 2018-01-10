import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';
import { Images } from 'Theme';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class HistoryItem extends Component {
  render() {
    const { thumbnail, title, singer, creator, classes } = this.props;
    return (
      <Grid container className={classNames(classes.container)}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className={classes.info}>
          <div className={classes.name}>{title}</div>
          <div className={classes.singer}>{singer}</div>
          {creator && (
            <div className={classes.creator}>
              Added by
              <Tooltip placement={'bottom'} title={creator.name}>
                <img
                  src={creator.avatar_url || Images.avatar.default}
                  className={classes.creatorAvatar}
                  onClick={this._onCreatorIconClicked}
                />
              </Tooltip>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  classes: PropTypes.any,
  song_id: PropTypes.any,
  score: PropTypes.number,
  singer: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  creator: PropTypes.object,
  name: PropTypes.string,
};

export default withStyles(styles)(HistoryItem);
