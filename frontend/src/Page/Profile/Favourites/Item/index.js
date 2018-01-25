import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import { GridListTile } from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'react-icons/lib/md/delete';

import { withNotification } from 'Component/Notification';
import { transformNumber } from 'Transformer';
import { compose } from 'redux';

import styles from './styles';

// custom style when user hover by mouse
const hover = {
  inHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    transition: 'all 0.6s',
  },
  outHover: {
    transition: 'all 0.6s'
  }
};

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class FavoriteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: true,
      openAlert: false,
      hover: 'outHover',
    };

    this._onRemoveFavourite = this._onRemoveFavourite.bind(this);
    this._onAlertOpen = this._onAlertOpen.bind(this);
    this._onAlertClose = this._onAlertClose.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderAlertDialog = this._renderAlertDialog.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
  }

  _onAlertOpen() {
    this.setState({ openAlert: true });
  }

  _onAlertClose() {
    this.setState({ openAlert: false });
  }

  _onRemoveFavourite() {
    const { song_id, url, userId } = this.props;
    this.props.onRemoveSong({
      songId: song_id,
      userId,
      songUrl: url,
    });
    this._onAlertClose();
  }

  changeFocus() {
    this.setState({ hover: 'inHover' });
  }

  resetFocus() {
    this.setState({ hover: 'outHover' });
  }

  _renderItem() {
    const { classes, thumbnail, title, duration } = this.props;
    return [
      <Grid key={1} className={classes.thumbnail}>
        <img className={classes.img} src={thumbnail} alt="" />
        <div className={classes.duration}>
          <span className={classes.durationText}>
            {transformNumber.millisecondsToTime(duration)}
          </span>
        </div>
      </Grid>,
      <div key={2} className={classes.info}>
        <Tooltip placement={'top'} title={title}>
          <div className={classes.name}>{title}</div>
        </Tooltip>
        <div
          style={{ ...hover.actions, ...hover[this.state.hover] }}
          className={classes.actions}
          onMouseEnter={this.changeFocus}
          onMouseLeave={this.resetFocus}
        >
          {this.state.hover === 'inHover' && (
            <Tooltip placement={'top'} title={'Remove this song'}>
              <IconButton
                className={classes.button}
                onClick={this._onAlertOpen}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>,
    ];
  }

  _renderAlertDialog() {
    return (
      <Dialog
        open={this.state.openAlert}
        onClose={this._onAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This song will remove from your favorite list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this._onAlertClose} color="primary">
            No
          </Button>
          <Button onClick={this._onRemoveFavourite} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { key, classes } = this.props;

    return [
      <GridListTile key={key} className={classes.container}>
        {this._renderItem()}
        {this._renderAlertDialog()}
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
  key: PropTypes.number,
  favouriteSongRequest: PropTypes.func,
  url: PropTypes.string,
  onRemoveSong: PropTypes.func,
};

export default compose(withStyles(styles), withNotification)(FavoriteItem);
