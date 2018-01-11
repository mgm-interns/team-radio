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
import orderBy from 'lodash/orderBy';
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
      // leaveStationRequest,
      setPreviewVideo,
      notification,
      userId,
    } = this.props;
    // Only change to new station if the id has changed
    if (station.station_id !== stationId) {
      // Leave current station
      // leaveStationRequest({ userId, stationId });

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

    /**
     * Ordered stations
     * - Current station always be on top
     * - higher online users higher position
     * - Active station
     */
    const orderedStations = orderBy(
      filteredStations,
      [
        // Current station always be on top
        ({ station_id }) => (station_id === stationId ? -1 : 1),
        // Sort by number of online users
        'online_count',
        // Sort by is active station
        'isActive',
      ],
      ['asc', 'desc', 'asc'],
    );

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        className={classes.container}
        renderView={() => <div className={classes.scrollArea} />}
        ref={ref => {
          this.scrollBar = ref;
        }}
      >
        {orderedStations.map((station, index) => (
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
