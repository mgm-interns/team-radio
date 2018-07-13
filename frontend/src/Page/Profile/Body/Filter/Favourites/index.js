import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import Favourites from 'Page/Profile/Favourites';
import {
  getFavouriteSongs,
  favouriteSongRequest,
} from 'Redux/api/favouriteSongs/actions';

import styles from './styles';
import pins from './fixtures';

/* eslint-disable no-shadow */
class FilterFavourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favouriteSongs: [],
    };

    this._showNotification = this._showNotification.bind(this);
    this._getFavouriteSongs = this._getFavouriteSongs.bind(this);
    this._onRemoveSong = this._onRemoveSong.bind(this);
  }

  componentDidMount() {
    this._getFavouriteSongs(this.props);
  }

  _getFavouriteSongs(props) {
    const { userId } = props;

    this.props.getFavouriteSongs(userId);
  }

  _onRemoveSong({ songId, userId, songUrl }) {
    this.props.favouriteSongRequest({
      songId,
      userId,
      songUrl,
    });
    this._getFavouriteSongs({ userId });
    this.forceUpdate();
  }

  _showNotification(content) {
    const { notification } = this.props;

    notification.app.success({
      message: content,
    });
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, userId, favouriteSongs } = this.props;

    return (
      <Grid container className={classes.containerWrapper}>
        <Typography type="title">{`Hear the tracks you've saved`}</Typography>
        <Grid item xs={12} className={classes.favouritesContainer}>
          {!userId ? (
            FilterFavourites._renderLoading()
          ) : (
            <Favourites
              favouriteSongs={favouriteSongs.data}
              userId={userId}
              onRemoveSong={this._onRemoveSong}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

FilterFavourites.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
  favouriteSongs: PropTypes.object,
  getFavouriteSongs: PropTypes.func,
  userId: PropTypes.string,
  favourite: PropTypes.object,
  notification: PropTypes.any,
  favouriteSongRequest: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  favouriteSongs: api.favouriteSongs.favourite,
});

const mapDispatchToProps = dispatch => ({
  getFavouriteSongs: userId => dispatch(getFavouriteSongs({ userId })),
  favouriteSongRequest: ({ songId, userId, stationId, songUrl }) =>
    dispatch(favouriteSongRequest({ songId, userId, stationId, songUrl })),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FilterFavourites);
