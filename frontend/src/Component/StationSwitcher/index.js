import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import { setPreviewVideo } from 'Redux/page/station/actions';
import Images from 'Theme/Images';
import { withNotification } from 'Component/Notification';
import orderBy from 'lodash/orderBy';
import { StationList } from 'Component';
import styles from './styles';

/* eslint-disable no-shadow */
class StationSwitcher extends Component {
  constructor(props) {
    super(props);

    this._goToStationPage = this._goToStationPage.bind(this);
    this._filterStations = this._filterStations.bind(this);
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
      // No need to send this, server will handle this case
      // leaveStationRequest({ userId, stationId });

      // Join in selected station
      history.push(`/station/${station.station_id}`);
      joinStationRequest({ userId, stationId: station.station_id });
      setPreviewVideo();
      // Scroll to left after switch successful
      this.scrollbarRef.scrollLeft();
    }
    notification.app.success({
      message: `Switched to station ${station.station_name}`,
    });
  }

  _filterStations() {
    const {
      stations = [],
      currentStation,
      match: { params: { stationId } },
    } = this.props;

    /**
     * Set sleepy thumbnail if there is no thumbnail in station
     * Then remove current station from the list
     */
    const filteredStations = stations
      .map(station => ({
        ...station,
        thumbnail: station.thumbnail || Images.stationDefault,
      }))
      .filter(
        station =>
          (currentStation.station && currentStation.station.station_id) !==
          station.station_id,
      );

    /**
     * Ordered stations
     * - Current station always be on top
     * - higher online users higher position
     * - Active station
     */
    return orderBy(
      filteredStations,
      [
        // Current station always be on top
        ({ station_id }) => (station_id === stationId ? -1 : 1),
        // Sort by number of online users
        'online_count',
        // Sort by is active station
        'thumbnail',
      ],
      ['asc', 'desc', 'desc'],
    );
  }

  render() {
    const { stations } = this.props;

    return (
      <StationList
        stations={this._filterStations()}
        loading={!stations}
        onItemClick={this._goToStationPage}
        scrollbarRef={ref => {
          this.scrollbarRef = ref;
        }}
      />
    );
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
