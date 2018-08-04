import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LightBulbIcon from 'react-icons/lib/fa/lightbulb-o';
import VolumeUpIcon from 'react-icons/lib/md/volume-up';
import VolumeOffIcon from 'react-icons/lib/md/volume-off';
import MdMusicVideo from 'react-icons/lib/md/music-video';
import FaQrcode from 'react-icons/lib/fa/qrcode';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import classNames from 'classnames';
import fixture from 'Fixture/landing';
import { transformNumber } from 'Transformer';
import {
  StationSwitcher,
  NavBar,
  Footer,
  TabContainer,
  QRCode,
} from 'Component';
import {
  joinStation,
  redirectStation,
  leaveStation,
  addSong,
} from 'Redux/api/currentStation/actions';
import { getFavouriteSongs } from 'Redux/api/favouriteSongs/actions';
import {
  muteVideoRequest,
  passiveUserRequest,
  disableStationsSwitcher,
  enableStationsSwitcher,
} from 'Redux/page/station/actions';
import AddLink from './AddLink';
import Playlist from './Playlist';
import History from './History';
import Favourites from './Favourites';
import NowPlaying from './NowPlaying';
import OnlineUsers from './OnlineUsers';
import StationSharing from './Sharing';
import Chatbox from './Chatbox';
import styles from './styles';
import StationSkipRule from './SkipRule';
import { Util } from '../../Util/index';

/* eslint-disable no-shadow */
class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
      tabValue: 0,
      isPassive: false,
      nowPlayingSong: null,
      isMobileBrowser: Util.isMobileBrowser(),
      isEnabledVideo: true,
      isShowingQRCode: false,
      isOnLight: true,
    };

    if (this.state.isMobileBrowser) {
      this.state.isEnabledVideo = false;
    }

    this._onVolumeClick = this._onVolumeClick.bind(this);
    this._onLightClick = this._onLightClick.bind(this);
    this._renderTabs = this._renderTabs.bind(this);
    this._handleTabChange = this._handleTabChange.bind(this);
    this._checkValidStation = this._checkValidStation.bind(this);
    this._getFilteredPlaylist = this._getFilteredPlaylist.bind(this);
    this._toggleShowingVideoPlayer = this._toggleShowingVideoPlayer.bind(this);
    this._toggleShowingQRCode = this._toggleShowingQRCode.bind(this);
  }

  componentWillMount() {
    this._checkValidStation(this.props);
    this.props.getFavouriteSongs(this.props.userId);
  }

  componentWillUnmount() {
    const {
      match: {
        params: { stationId },
      },
      userId,
    } = this.props;
    this.props.leaveStation({ stationId, userId });
  }

  componentDidMount() {
    const { muteVideoRequest } = this.props;

    // Handle volume after the page is reloaded
    const volumeStatus = JSON.parse(localStorage.getItem('volumeStatus')) || {};
    muteVideoRequest({
      muteNowPlaying: volumeStatus.muteNowPlaying,
      mutePreview: volumeStatus.mutePreview,
      userDid: volumeStatus.userDid,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      muteNowPlaying,
      currentStation: { nowPlaying },
    } = nextProps;

    this._checkValidStation(nextProps);

    // Close passive screen if nowPlaying is finished
    if (!nowPlaying.url) {
      this.props.passiveUserRequest();
    }

    // Update video's information when nowPlaying is changed
    if (this.state.isPassive && nowPlaying.url) {
      this._getFilteredPlaylist();
    }

    this.setState({
      muted: muteNowPlaying,
    });

    // Auto re-add a random song from history when there is no song on the playlist
    // const {
    //   currentStation: { playlist, history, station },
    //   userId,
    // } = this.props;

    // const nextPlaylist = nextProps.currentStation.playlist;
    // const nextStation = nextProps.currentStation.station;

    // if (playlist.length > 0 && nextPlaylist.length === 0) {
    //   // check if user stays in the same station
    //   if (station && station.station_id === nextStation.station_id) {
    //     const { match: { params: { stationId } } } = this.props;
    //     const randomIndex = Math.floor(
    //       Math.random() * Math.floor(history.length),
    //     );
    //     const song = history.length ? history[randomIndex] : playlist[0];
    //     const { url, title, thumbnail, creator, duration } = song;
    //     this.props.addSong({
    //       songUrl: url,
    //       title,
    //       thumbnail,
    //       stationId,
    //       userId,
    //       creator,
    //       duration,
    //       replay: true,
    //     });
    //   }
    // }
  }

  _getFilteredPlaylist() {
    const {
      currentStation: { playlist, nowPlaying },
    } = this.props;
    let nowPlayingSong = null;

    playlist.filter(item => {
      if (item.song_id === nowPlaying.song_id) {
        nowPlayingSong = item;
        return false;
      }
      return true;
    });

    this.setState({ nowPlayingSong });
  }

  _checkValidStation(props) {
    // Get station id from react-router
    const {
      match: {
        params: { stationId },
      },
      history,
      userId,
      currentStation: { joined },
    } = props;
    // Station must be a valid string
    if (!joined.loading && !joined.success && !joined.loggedInStation) {
      this.props.joinStation({ stationId, userId });
      // this.props.getFavouriteSongs(userId);
    }
    // Check if user is already joined in other station
    if (
      !joined.loading &&
      joined.failed &&
      !!joined.loggedInStation &&
      !this.loggedInStationTimeout
    ) {
      this.props.disableStationsSwitcher();

      this.loggedInStationTimeout = setTimeout(() => {
        const { stationId } = joined.loggedInStation;
        console.log(stationId);
        history.replace(`/station/${stationId}`);
        this.props.enableStationsSwitcher();
        this.props.redirectStation({ stationId, userId });
        // this.props.getFavouriteSongs(userId);
      }, 5000);
      return;
    }
    // Clear timeout instance when user is about to login other station
    if (!joined.loggedInStation) {
      clearTimeout(this.loggedInStationTimeout);
    }
    if (!joined.loading && joined.failed && !joined.loggedInStation) {
      history.replace('/');
    }
  }

  _onVolumeClick() {
    const { muteVideoRequest, muteNowPlaying } = this.props;
    muteVideoRequest({
      muteNowPlaying: !muteNowPlaying,
      userDid: true,
    });
  }

  _onLightClick() {
    const {
      passiveUserRequest,
      currentStation: { nowPlaying },
    } = this.props;

    this.setState(
      {
        isPassive: !nowPlaying.url ? false : !this.state.isPassive,
        isOnLight: !this.state.isOnLight,
      },
      () => {
        passiveUserRequest(this.state.isPassive);
        if (this.state.isPassive) {
          document
            .getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow-y: hidden');
        } else {
          document.getElementsByTagName('body')[0].removeAttribute('style');
        }
      },
    );

    this._getFilteredPlaylist();
  }

  _toggleShowingVideoPlayer() {
    this.setState({ isEnabledVideo: !this.state.isEnabledVideo });
  }

  _toggleShowingQRCode() {
    this.setState({ isShowingQRCode: !this.state.isShowingQRCode });
  }

  _handleTabChange(e, value) {
    this.setState({ tabValue: value });
  }

  _renderTabs() {
    const {
      classes,
      favourite: { favourite },
      currentStation: { playlist, history },
    } = this.props;
    const { tabValue } = this.state;

    return [
      <Tabs
        key={0}
        fullWidth
        value={tabValue}
        onChange={this._handleTabChange}
        indicatorColor="primary"
        className={classes.tabs}
      >
        {[
          { label: `Playlist (${playlist.length})` },
          { label: `History` },
          { label: `Favourites` },
        ].map(({ label }, index) => (
          <Tab
            key={index}
            classes={{
              label: classes.tabLabel,
              fullWidth: classes.fullWidthTab,
            }}
            label={label}
          />
        ))}
      </Tabs>,
      tabValue === 0 && (
        <TabContainer key={1}>
          <Playlist
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !playlist,
            })}
            data={playlist}
          />
        </TabContainer>
      ),
      tabValue === 1 && (
        <TabContainer key={2}>
          <History
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !history,
            })}
            data={history}
          />
        </TabContainer>
      ),
      tabValue === 2 && (
        <TabContainer key={3}>
          <Favourites
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !history,
            })}
            data={favourite.data}
          />
        </TabContainer>
      ),
    ];
  }

  render() {
    const {
      classes,
      currentStation: { station, nowPlaying, playlist, joined },
      passive,
      disableSwitcher,
      userId,
    } = this.props;
    const {
      muted,
      nowPlayingSong,
      isEnabledVideo,
      isMobileBrowser,
      isShowingQRCode,
    } = this.state;
    const isOwnerStation = station && userId === station.owner_id;
    return [
      passive && (
        <div key={0} className={classes.passiveContainer}>
          <img src={fixture.logo} alt="Team Radio" className={classes.logo} />
        </div>
      ),
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Grid item xs={12} className={classes.switcherContainer}>
          <Grid
            container
            justify={'center'}
            className={classes.switcherContent}
          >
            <Grid item xs={12} style={{ padding: 0 }}>
              <StationSwitcher disable={disableSwitcher} />
            </Grid>
          </Grid>
        </Grid>
        {!isShowingQRCode ? null : (
          <Grid item xs={12} className={classes.container}>
            <div className={classes.qrCodeContainer}>
              <QRCode text={window.location.href} />
            </div>
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <Grid container justify={'center'}>
            <Grid
              item
              xs={12}
              md={7}
              lg={6}
              xl={6}
              className={passive ? classes.playerContainer : null}
            >
              <Grid
                container
                className={classNames({
                  [classes.nowPlayingContainer]: passive,
                })}
              >
                <Grid item xs={12} className={classes.nowPlayingHeader}>
                  <div className={classes.titleContainer}>
                    {!joined.loading && !joined.loggedInStation ? (
                      [
                        <Typography
                          key={1}
                          type={'display1'}
                          className={classNames({
                            [classes.passiveStationMainColor]: passive,
                          })}
                        >
                          {station && station.station_name}
                        </Typography>,
                        passive ? null : <OnlineUsers key={2} />,
                      ]
                    ) : (
                      <CircularProgress className={classes.loadingTitle} />
                    )}
                  </div>
                  <div className={classes.nowPlayingActions}>
                    {!nowPlaying.url || !isEnabledVideo ? null : (
                      <IconButton
                        onClick={this._onVolumeClick}
                        className={classNames({
                          [classes.passiveStationMainColor]: passive,
                        })}
                      >
                        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                      </IconButton>
                    )}
                    {!isEnabledVideo ? null : (
                      <IconButton
                        color={passive ? 'primary' : 'default'}
                        onClick={this._onLightClick}
                      >
                        <LightBulbIcon />
                      </IconButton>
                    )}

                    {!this.state.isOnLight || isMobileBrowser ? null : (
                      <IconButton
                        color={isEnabledVideo ? 'primary' : 'default'}
                        onClick={this._toggleShowingVideoPlayer}
                      >
                        <MdMusicVideo />
                      </IconButton>
                    )}

                    {passive ? null : (
                      <IconButton
                        color={isShowingQRCode ? 'primary' : 'default'}
                        onClick={this._toggleShowingQRCode}
                      >
                        <FaQrcode />
                      </IconButton>
                    )}
                    {passive ? null : <StationSharing />}
                    {(!passive && isOwnerStation) === true ? (
                      <StationSkipRule />
                    ) : null}
                  </div>
                </Grid>
                {isEnabledVideo ? (
                  <NowPlaying
                    className={classNames([classes.content], {
                      [classes.emptyNowPlaying]: !playlist,
                      [classes.nowPlayingPassive]: passive,
                    })}
                    autoPlay={true}
                    muted={muted}
                    playlistLength={playlist.length}
                  />
                ) : null}
                {nowPlayingSong && passive ? (
                  <div className={classes.nowPlayingInfo}>
                    <p>{nowPlayingSong.title}</p>
                    <p>
                      {transformNumber.millisecondsToTime(
                        nowPlayingSong.duration,
                      )}
                    </p>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} lg={3} xl={3}>
              {this._renderTabs()}
            </Grid>
            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Chatbox />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify={'center'}>
            <Grid item xs={12} lg={9} xl={6}>
              <AddLink />
            </Grid>
            <Grid item xs={12} lg={3} xl={2} />
          </Grid>
        </Grid>
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

StationPage.propTypes = {
  classes: PropTypes.object,
  joinStation: PropTypes.func,
  leaveStation: PropTypes.func,
  redirectStation: PropTypes.func,
  match: PropTypes.any,
  history: PropTypes.object,
  currentStation: PropTypes.any,
  userId: PropTypes.string,
  muteVideoRequest: PropTypes.func,
  muteNowPlaying: PropTypes.bool,
  mutedPreview: PropTypes.bool,
  preview: PropTypes.object,
  passiveUserRequest: PropTypes.func,
  passive: PropTypes.bool,
  getFavouriteSongs: PropTypes.func,
  favourite: PropTypes.object,
  disableSwitcher: PropTypes.bool,
  disableStationsSwitcher: PropTypes.func,
  enableStationsSwitcher: PropTypes.func,
  addSong: PropTypes.func,
};

const mapStateToProps = ({ api, page }) => ({
  currentStation: api.currentStation,
  muteNowPlaying: page.station.muteNowPlaying,
  mutedPreview: page.station.mutedPreview,
  preview: page.station.preview,
  userId: api.user.data.userId,
  passive: page.station.passive,
  favourite: api.favouriteSongs,
  disableSwitcher: page.station.disableSwitcher,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
  leaveStation: option => dispatch(leaveStation(option)),
  redirectStation: stationId => dispatch(redirectStation(stationId)),
  muteVideoRequest: ({ muteNowPlaying, mutePreview, userDid }) =>
    dispatch(muteVideoRequest({ muteNowPlaying, mutePreview, userDid })),
  passiveUserRequest: isPassive => dispatch(passiveUserRequest(isPassive)),
  getFavouriteSongs: userId => dispatch(getFavouriteSongs({ userId })),
  disableStationsSwitcher: () => dispatch(disableStationsSwitcher()),
  enableStationsSwitcher: () => dispatch(enableStationsSwitcher()),
  addSong: option => dispatch(addSong(option)),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(StationPage);
