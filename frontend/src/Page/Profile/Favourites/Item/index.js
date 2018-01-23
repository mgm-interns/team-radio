import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccessTimeIcon from 'react-icons/lib/md/access-time';
import DeleteIcon from 'react-icons/lib/md/delete';
import withStyles from 'material-ui/styles/withStyles';
import { GridListTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { compose } from 'redux';
import { withNotification } from 'Component/Notification';
import { transformNumber } from 'Transformer';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class FavoriteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: true,
    };

    this.deleteSong = this.deleteSong.bind(this);
  }

  deleteSong(event) {
    event.preventDefault();
    const { notification } = this.props;
    notification.app.warning({
      message: 'This feature is not ready yet!',
    });
  }

  render() {
    const { thumbnail, title, singer, classes, duration } = this.props;

    return [
      <GridListTile key={thumbnail} className={classes.container}>
        <img className={classes.thumbnail} src={thumbnail} alt="" />
        <div key={2} className={classes.info}>
          <div style={{ flex: 1 }}>
            <div className={classes.name}>{title || 'undefined'}</div>
            <div className={classes.singer}>
              <AccessTimeIcon color={'rgba(0,0,0,0.54)'} size={14} />
              <span className={classes.durationText}>
                {transformNumber.millisecondsToTime(duration)}
              </span>
            </div>
          </div>
          <div className={classes.actions}>
            <span>
              <IconButton onClick={this.deleteSong}>
                {this.state.isFavourite && <DeleteIcon />}
              </IconButton>
            </span>
          </div>
        </div>
      </GridListTile>,
    ];
  }
}

FavoriteItem.propTypes = {
  classes: PropTypes.any,
  song_id: PropTypes.any,
  playing: PropTypes.bool,
  score: PropTypes.number,
  singer: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  creator: PropTypes.object,
  name: PropTypes.string,
  theme: PropTypes.any,
  upVoteSong: PropTypes.func,
  downVoteSong: PropTypes.func,
  up_vote: PropTypes.array,
  down_vote: PropTypes.array,
  duration: PropTypes.number,
  userId: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  match: PropTypes.any,
  notification: PropTypes.object,
};

export default compose(withStyles(styles), withNotification)(FavoriteItem);
