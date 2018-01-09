import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import classNames from 'classnames';
import { StationSwitcher, NavBar, Footer } from 'Component';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import { muteNowPlaying, mutePreview } from 'Redux/page/station/actions';
import AlertIcon from 'react-icons/lib/go/alert';
import AddLink from './AddLink';
import Playlist from './Playlist';
import History from './History';
import NowPlaying from './NowPlaying';
import styles from './styles';
import StationSharing from './Sharing';

const STATION_NAME_DEFAULT = 'Station Name';

/* eslint-disable no-shadow */
class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
      playlist: [],
      history: [],
      switchToPlaylist: true,
      switchToHistory: false,
    };

    this._onVolumeClick = this._onVolumeClick.bind(this);
    this._onPlaylistClick = this._onPlaylistClick.bind(this);
    this._onHistoryClick = this._onHistoryClick.bind(this);
  }

  componentWillMount() {
    // Get station id from react-router
    const {
      match: { params: { stationId } },
      history,
      userId,
      // mutedNowPlaying,
    } = this.props;
    if (stationId && stationId !== 'null' && stationId !== 'undefined') {
      this.props.joinStation({ stationId, userId });
    } else {
      // Go to landing page
      history.replace(`/`);
    }
  }

  componentWillUnmount() {
    const { match: { params: { stationId } }, userId } = this.props;
    this.props.leaveStation({ stationId, userId });
  }

  componentWillReceiveProps(nextProps) {
    const {
      currentStation,
      mutedNowPlaying,
      currentStation: { playlist },
    } = nextProps;

    // Clear the interval if join station request has success
    if (currentStation.joined === true) {
      clearInterval(this.joinStationInterval);
    }

    // Get playlist & history
    this.setState({
      playlist: playlist.filter(item => item.is_played === false),
      history: playlist.filter(item => item.is_played === true),
    });

    this.setState({ muted: mutedNowPlaying });
  }

  componentDidMount() {
    const { muteNowPlaying, mutePreview } = this.props;

    // Handle volume
    const volumeStatus = JSON.parse(localStorage.getItem('volumeStatus')) || [];
    volumeStatus.forEach(item => {
      switch (item.player) {
        case 'nowPlaying':
          muteNowPlaying(item.muted);
          this.setState({ muted: item.muted });
          break;
        case 'preview':
          mutePreview(item.muted);
          break;
        default:
          break;
      }
    });
  }

  // static getPlaylistLength(playlist) {
  //   if (!playlist) {
  //     return false;
  //   }
  //   const filteredPlaylist = playlist.filter(song => song.is_played === false);

  //   return filteredPlaylist.length;
  // }

  _onVolumeClick() {
    const { mutePreview, muteNowPlaying, mutedNowPlaying } = this.props;
    muteNowPlaying(!mutedNowPlaying);
    // always mute preview even any video is playing or not
    mutePreview(true);
  }

  _onPlaylistClick() {
    this.setState({
      switchToPlaylist: true,
      switchToHistory: false,
    });
  }

  _onHistoryClick() {
    this.setState({
      switchToPlaylist: false,
      switchToHistory: true,
    });
  }

  render() {
    const { classes, currentStation: { station, nowPlaying } } = this.props;
    const {
      muted,
      playlist,
      history,
      switchToPlaylist,
      switchToHistory,
    } = this.state;
    const volumeIconClass = classNames({
      volume: nowPlaying.url !== '',
    });

    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Grid item xs={12} className={classes.switcherContainer}>
          <div className={classes.switcherContent}>
            <StationSwitcher />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={7} xl={8}>
              <Grid container>
                <Grid item xs={12} className={classes.nowPlayingHeader}>
                  <Typography type={'display1'}>
                    {(station && station.station_name) || STATION_NAME_DEFAULT}
                  </Typography>
                  <div className={classes.nowPlayingActions}>
                    {!nowPlaying.url ? null : (
                      <IconButton
                        onClick={this._onVolumeClick}
                        className={volumeIconClass}
                        color="default"
                      >
                        {muted ? 'volume_off' : 'volume_up'}
                      </IconButton>
                    )}
                    <StationSharing />
                  </div>
                </Grid>
                {playlist.length > 0 ? (
                  <NowPlaying
                    className={classNames(
                      [classes.content, classes.nowPlaying],
                      {
                        [classes.emptyNowPlaying]: !playlist,
                      },
                    )}
                    autoPlay={true}
                    muted={muted}
                    nowPlaying={nowPlaying}
                  />
                ) : (
                  <Grid item xs={12}>
                    <Grid
                      container
                      className={classNames(
                        classes.content,
                        classes.nowPlayingSuggestion,
                      )}
                      justify={'center'}
                      alignItems={'center'}
                      alignContent={'center'}
                      direction={'column'}
                    >
                      <AlertIcon className={classes.suggestionIcon} />
                      <Typography
                        type={'title'}
                        align={'center'}
                        className={classes.suggestionText}
                      >
                        There is no song in playlist!
                        <br />
                        Please add a new song.
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} xl={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid
                    container
                    justify="space-between"
                    className={classes.playlistHeader}
                  >
                    <Typography
                      type={'display1'}
                      className={classNames([classes.playlistMenuItem], {
                        [classes.switchedTitle]: switchToPlaylist,
                      })}
                      onClick={this._onPlaylistClick}
                    >
                      Playlist ({playlist.length})
                    </Typography>
                    <div className={classes.nowPlayingHeader}>
                      <Typography
                        type={'display1'}
                        className={classNames([classes.playlistMenuItem], {
                          [classes.switchedTitle]: switchToHistory,
                        })}
                        onClick={this._onHistoryClick}
                      >
                        History ({history.length})
                      </Typography>
                      {/* <IconButton color="default">play_arrow</IconButton> */}
                    </div>
                  </Grid>
                </Grid>
                {switchToHistory ? (
                  <History
                    className={classNames(classes.content, {
                      [classes.emptyPlaylist]: !history,
                    })}
                    history={history}
                  />
                ) : (
                  <Playlist
                    className={classNames(classes.content, {
                      [classes.emptyPlaylist]: !playlist,
                    })}
                    playlist={playlist}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AddLink />
            </Grid>
          </Grid>
        </Grid>
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
  joinStation: PropTypes.func,
  leaveStation: PropTypes.func,
  match: PropTypes.any,
  history: PropTypes.any,
  currentStation: PropTypes.any,
  userId: PropTypes.string,
  muteNowPlaying: PropTypes.func,
  mutePreview: PropTypes.func,
  mutedNowPlaying: PropTypes.bool,
  mutedPreview: PropTypes.bool,
  preview: PropTypes.object,
};

const mapStateToProps = ({ api, page }) => ({
  currentStation: api.currentStation,
  mutedNowPlaying: page.station.mutedNowPlaying,
  mutedPreview: page.station.mutedPreview,
  preview: page.station.preview,
  userId: api.user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
  leaveStation: option => dispatch(leaveStation(option)),
  muteNowPlaying: muted => dispatch(muteNowPlaying(muted)),
  mutePreview: muted => dispatch(mutePreview(muted)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationPage);
