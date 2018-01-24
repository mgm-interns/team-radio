import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccessTimeIcon from 'react-icons/lib/md/access-time';
import DeleteIcon from 'react-icons/lib/md/delete';
import withStyles from 'material-ui/styles/withStyles';
import { GridListTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { withNotification } from 'Component/Notification';
import { transformNumber } from 'Transformer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { favouriteSongRequest } from 'Redux/api/favouriteSongs/actions';

import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class FavoriteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: true,
      openAlert: false,
    };

    this._onRemoveFavourite = this._onRemoveFavourite.bind(this);
    this._onAlertOpen = this._onAlertOpen.bind(this);
    this._onAlertClose = this._onAlertClose.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderAlertDialog = this._renderAlertDialog.bind(this);
  }

  _onAlertOpen() {
    this.setState({ open: true });
  }

  _onAlertClose() {
    this.setState({ open: false });
  }

  _onRemoveFavourite() {
    const { song_id, url, userId } = this.props;
    this.props.favouriteSongRequest({
      songId: song_id,
      userId,
      songUrl: url,
    });
    this._onAlertClose();
  }

  _renderItem() {
    const { classes, thumbnail, title, duration } = this.props;
    return [
      <img key={1} className={classes.thumbnail} src={thumbnail} alt="" />,
      <div key={1} className={classes.info}>
        <div className={classes.name}>{title || 'undefined'}</div>
        <div className={classes.singer}>
          <AccessTimeIcon color={'rgba(0,0,0,0.54)'} size={14} />
          <span className={classes.durationText}>
            {transformNumber.millisecondsToTime(duration)}
          </span>
        </div>,
        <div key={1} className={classes.actions}>
          <Tooltip placement={'bottom'} title={'Remove'}>
            <IconButton onClick={this._onAlertOpen}>
              {this.state.isFavourite && <DeleteIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </div>,
    ];
  }

  _renderAlertDialog() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this._onAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This song will be remove from your favourite list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this._onAlertClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this._onRemoveFavourite} color="primary" autoFocus>
            Agree
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
  favouriteSongRequest: PropTypes.object,
  url: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  favouriteSongRequest: ({ songId, userId, stationId, songUrl }) =>
    dispatch(favouriteSongRequest({ songId, userId, stationId, songUrl })),
});

export default compose(
  withStyles(styles),
  withNotification,
  connect(undefined, mapDispatchToProps),
)(FavoriteItem);
