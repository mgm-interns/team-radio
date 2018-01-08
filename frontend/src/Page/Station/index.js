import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import classNames from 'classnames';
import { StationSwitcher, NavBar, Footer } from 'Component';
import { Images } from 'Theme';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import { muteNowPlaying, mutePreview } from 'Redux/page/station/actions';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import styles from './styles';
import StationSharing from './Sharing';

const STATION_NAME_DEFAULT = 'Station Name';
const JOIN_STATION_DELAY = 2000; // 2 seconds

/* eslint-disable no-shadow */
class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
    };

    this._onVolumeClick = this._onVolumeClick.bind(this);
  }

  joinStationInterval = null;

  componentWillMount() {
    // Get station id from react-router
    const {
      match: { params: { stationId } },
      history,
      userId,
      // mutedNowPlaying,
    } = this.props;
    if (stationId) {
      this.props.joinStation({ stationId, userId });
      this.joinStationInterval = setInterval(() => {
        this.props.joinStation({ stationId, userId });
      }, JOIN_STATION_DELAY);
    } else {
      history.replace(`/`);
    }

    // watch volume
    // this.setState({ muted: mutedNowPlaying });
  }

  componentWillUnmount() {
    const { match: { params: { stationId } }, userId } = this.props;
    this.props.leaveStation({ stationId, userId });
    clearInterval(this.joinStationInterval);
  }

  componentWillReceiveProps(nextProps) {
    const { currentStation, mutedNowPlaying } = nextProps;

    this.setState({ muted: mutedNowPlaying });

    if (
      (currentStation.station && currentStation.station.id) !==
      (this.props.currentStation.station &&
        this.props.currentStation.station.id)
    ) {
      clearInterval(this.joinStationInterval);
    }
  }

  componentDidMount() {
    const { muteNowPlaying, mutePreview } = this.props;
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

  static isNotAnEmptyArray(playlist) {
    if (!playlist) {
      return false;
    }
    const filteredPlaylist = playlist.filter(song => song.is_played === false);

    return !!filteredPlaylist.length;
  }

  _onVolumeClick() {
    const { mutePreview, muteNowPlaying, mutedNowPlaying } = this.props;
    muteNowPlaying(!mutedNowPlaying);
    // always mute preview even any video is playing or not
    mutePreview();
  }

  render() {
    const {
      classes,
      currentStation: { station, playlist, nowPlaying },
    } = this.props;
    const { muted } = this.state;
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
                  <h1>
                    {station ? station.station_name : STATION_NAME_DEFAULT}
                  </h1>
                  <div className={classes.nowPlayingActions}>
                    <IconButton
                      onClick={this._onVolumeClick}
                      className={volumeIconClass}
                      color="default"
                    >
                      {muted ? 'volume_off' : 'volume_up'}
                    </IconButton>
                    <StationSharing />
                  </div>
                </Grid>
                {StationPage.isNotAnEmptyArray(playlist) ? (
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
                    <img
                      src={Images.notFound}
                      className={classes.emptyNowPlayingImage}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} xl={4}>
              <Grid container>
                <Grid item xs={12}>
                  <h1>Now Playing</h1>
                </Grid>
                {StationPage.isNotAnEmptyArray(playlist) && (
                  <Playlist
                    className={classNames(classes.content, {
                      [classes.emptyPlaylist]: !playlist,
                    })}
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
