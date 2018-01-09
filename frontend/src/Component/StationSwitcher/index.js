import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import { setPreviewVideo } from 'Redux/page/station/actions';
import { Scrollbars } from 'react-custom-scrollbars';
import Images from 'Theme/Images';
import { withNotification } from 'Component/Notification';
import SwitcherItem from './Item';
import styles from './styles';

/* eslint-disable no-shadow */
class StationSwitcher extends Component {
  constructor(props) {
    super(props);

    this._renderSwitcher = this._renderSwitcher.bind(this);
    this._goToStationPage = this._goToStationPage.bind(this);
  }

  _goToStationPage(station) {
    const {
      match: { params: { stationId } },
      history,
      joinStationRequest,
      leaveStationRequest,
      setPreviewVideo,
      notification,
      userId,
    } = this.props;
    // Only change to new station if the id has changed
    if (station.station_id !== stationId) {
      // Leave current station
      leaveStationRequest({ userId, stationId });

      // Join in selected station
      history.push(`/station/${station.station_id}`);
      joinStationRequest({ userId, stationId: station.station_id });
      setPreviewVideo();
      // Scroll to left after switch successful
      this.scrollBar.scrollToLeft();
    }
    notification.app.success({
      message: `Switched to station ${station.station_name}`,
    });
  }

  _renderSwitcher() {
    const {
      classes,
      stations,
      currentStation,
      match: { params: { stationId } },
    } = this.props;

    const filteredStations = stations.map(station => ({
      ...station,
      isActive:
        (currentStation.station && currentStation.station.station_id) ===
        station.station_id,
      thumbnail: station.thumbnail || Images.stationDefault,
    }));
    // Sort by number of online users
    filteredStations.sort(
      (stationA, stationB) =>
        stationA.online_count > stationB.online_count ? 1 : -1,
    );
    // Move the current station to the first position of array
    filteredStations.sort(
      ({ station_id }) => (station_id === stationId ? -1 : 1),
    );

    return (
      <Scrollbars
        className={classes.container}
        renderView={() => <div className={classes.scrollArea} />}
        ref={ref => {
          this.scrollBar = ref;
        }}
      >
        {filteredStations.map((station, index) => (
          <SwitcherItem
            key={index}
            {...station}
            goToStationPage={() => this._goToStationPage(station)}
          />
        ))}
      </Scrollbars>
    );
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <div
        className={classNames([classes.container, classes.loadingContainer])}
      >
        {[1, 2, 3].map((item, index) => (
          <div key={index} className={classes.stationWrapper}>
            <div
              className={classNames([
                classes.stationAvatar,
                classes.loadingAvatar,
              ])}
            />
            <div
              className={classNames([classes.stationInfo, classes.loadingInfo])}
            />
          </div>
        ))}
      </div>
    );
  }

  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <div
        className={classNames([
          classes.container,
          classes.loadingContainer,
          classes.emptyContainer,
        ])}
      >
        <p>No stations. There is something wrong</p>
      </div>
    );
  }

  render() {
    const { stations } = this.props;
    let view = null;
    if (stations === undefined) {
      view = this._renderLoading();
    } else if (stations.length === 0) {
      view = this._renderEmptyComponent();
    } else {
      view = this._renderSwitcher();
    }

    return view;
  }
}

StationSwitcher.propTypes = {
  classes: PropTypes.any,
  currentStation: PropTypes.object,
  history: PropTypes.object,
  joinStationRequest: PropTypes.func,
  leaveStationRequest: PropTypes.func,
  stations: PropTypes.any,
  stationList: PropTypes.array,
  fetchStations: PropTypes.func,
  match: PropTypes.object,
  notification: PropTypes.object,
  setPreviewVideo: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = ({ api }) => ({
  stations: api.stations.data,
  currentStation: api.currentStation,
  userId: api.user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  joinStationRequest: option => dispatch(joinStation(option)),
  leaveStationRequest: option => dispatch(leaveStation(option)),
  setPreviewVideo: () => dispatch(setPreviewVideo()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withNotification,
)(StationSwitcher);
