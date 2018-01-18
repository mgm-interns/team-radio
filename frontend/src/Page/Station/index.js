import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LightBuldIcon from 'react-icons/lib/fa/lightbulb-o';
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
import { StationSwitcher, NavBar, Footer, TabContainer } from 'Component';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import {
  muteVideoRequest,
  passiveUserRequest,
} from 'Redux/page/station/actions';
import AddLink from './AddLink';
import Playlist from './Playlist';
import History from './History';
import NowPlaying from './NowPlaying';
import OnlineUsers from './OnlineUsers';
import styles from './styles';
import StationSharing from './Sharing';

const STATION_NAME_DEFAULT = 'Station Name';

/* eslint-disable no-shadow */
class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
      tabValue: 0,
      playlist: [],
      history: [],
      isPassive: false,
    };

    this._onVolumeClick = this._onVolumeClick.bind(this);
    this._onLightClick = this._onLightClick.bind(this);
    this._renderTabs = this._renderTabs.bind(this);
    this._handleTabChange = this._handleTabChange.bind(this);
    this._checkValidStation = this._checkValidStation.bind(this);
  }

  componentWillMount() {
    this._checkValidStation(this.props);
  }

  componentWillUnmount() {
    const { match: { params: { stationId } }, userId } = this.props;
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
      currentStation: { playlist, nowPlaying },
    } = nextProps;
    this._checkValidStation(nextProps);

    if (!nowPlaying.url) {
      this.props.passiveUserRequest();
    }

    this.setState({
      muted: muteNowPlaying,
      playlist: playlist.filter(item => item.is_played === false),
      history: playlist.filter(item => item.is_played === true),
    });
  }

  _checkValidStation(props) {
    // Get station id from react-router
    const {
      match: { params: { stationId } },
      history,
      userId,
      currentStation: { joined },
    } = props;
    // Station must be a valid string
    if (!joined.loading && !joined.success && !joined.loggedInStation) {
      this.props.joinStation({ stationId, userId });
    }
    // Check if user is already joined in other station
    if (!joined.loading && joined.failed && !!joined.loggedInStation) {
      setTimeout(() => {
        history.replace('/');
      }, 5000);
      return;
    }
    if (!joined.loading && joined.failed) {
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
    const { passiveUserRequest, currentStation: { nowPlaying } } = this.props;

    this.setState(
      { isPassive: !nowPlaying.url ? false : !this.state.isPassive },
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
  }

  _handleTabChange(e, value) {
    this.setState({ tabValue: value });
  }

  _renderTabs() {
    const { classes } = this.props;
    const { tabValue, playlist, history } = this.state;

    return [
      <Tabs
        key={1}
        fullWidth
        value={tabValue}
        onChange={this._handleTabChange}
        indicatorColor="primary"
        className={classes.tabs}
      >
        <Tab
          classes={{
            label: classes.tabLabel,
          }}
          label={`Playlist (${playlist.length})`}
        />
        <Tab
          classes={{
            label: classes.tabLabel,
          }}
          label={`History`}
        />
      </Tabs>,
      tabValue === 0 && (
        <TabContainer key={2}>
          <Playlist
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !playlist,
            })}
            playlist={playlist}
          />
        </TabContainer>
      ),
      tabValue === 1 && (
        <TabContainer key={3}>
          <History
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !history,
            })}
            history={history.reverse()}
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
      nowPlayingFromPlaylist,
    } = this.props;
    const { muted } = this.state;

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
          <div className={classes.switcherContent}>
            <StationSwitcher />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={7}
              lg={8}
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
                    {!nowPlaying.url ? null : (
                      <IconButton
                        onClick={this._onVolumeClick}
                        className={classNames({
                          [classes.passiveStationMainColor]: passive,
                        })}
                      >
                        {muted ? 'volume_off' : 'volume_up'}
                      </IconButton>
                    )}
                    <IconButton
                      color={passive ? 'primary' : 'default'}
                      onClick={this._onLightClick}
                    >
                      <LightBuldIcon />
                    </IconButton>
                    {passive ? null : <StationSharing />}
                  </div>
                </Grid>
                <NowPlaying
                  className={classNames([classes.content], {
                    [classes.emptyNowPlaying]: !playlist,
                    [classes.nowPlayingPassive]: passive,
                  })}
                  autoPlay={true}
                  muted={muted}
                  nowPlaying={nowPlaying}
                />
                {nowPlayingFromPlaylist && passive ? (
                  <div className={classes.nowPlayingInfo}>
                    <p>{nowPlayingFromPlaylist.title}</p>
                    <p>
                      {transformNumber.millisecondsToTime(
                        nowPlayingFromPlaylist.duration,
                      )}
                    </p>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              {this._renderTabs()}
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
  muteVideoRequest: PropTypes.func,
  muteNowPlaying: PropTypes.bool,
  mutedPreview: PropTypes.bool,
  preview: PropTypes.object,
  passiveUserRequest: PropTypes.func,
  passive: PropTypes.bool,
  nowPlayingFromPlaylist: PropTypes.object,
};

const mapStateToProps = ({ api, page }) => ({
  currentStation: api.currentStation,
  muteNowPlaying: page.station.muteNowPlaying,
  mutedPreview: page.station.mutedPreview,
  preview: page.station.preview,
  userId: api.user.data.userId,
  passive: page.station.passive,
  nowPlayingFromPlaylist: page.station.nowPlaying,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
  leaveStation: option => dispatch(leaveStation(option)),
  muteVideoRequest: ({ muteNowPlaying, mutePreview, userDid }) =>
    dispatch(muteVideoRequest({ muteNowPlaying, mutePreview, userDid })),
  passiveUserRequest: isPassive => dispatch(passiveUserRequest(isPassive)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationPage);
