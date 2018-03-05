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
import { StationList } from 'Component';
import styles from './styles';
import ArrowButton from 'Component/ArrowButton'

/* eslint-disable no-shadow */
class StationSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationLength: 0, //Number of displayed stations
    };
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
    const { stations = [], currentStation } = this.props;

    /**
     * Set sleepy thumbnail if there is no thumbnail in station
     * Then remove current station from the list
     */
    const filteredStations = stations
      .map(station => ({
        ...station,
        thumbnail: station.thumbnail || Images.stationDefault,
        playing: station.thumbnail,
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
    return filteredStations;
  }

  scrollLeft() {
      this.scrollbarRef.scrollLeft();
  }

  componentWillReceiveProps(nextProps) {
      //Save new length of stations to compare with old length at componentDidUpdate
      this.state = {stationLength : nextProps.stations.length};
  }

  componentDidUpdate(prevProps) {
      //Scroll to right if length of stations was changed (user load more stations)
      if (this.state.stationLength > prevProps.stations.length) {
          this.scrollbarRef.scrollXTo(1000000);
      }
  }

  render() {
    const { stations, classes, disable } = this.props;

    return (
      <div className={classes.container}>
        <ArrowButton scrollLeft={this.scrollLeft.bind(this)} />
        <StationList
          stations={this._filterStations()}
          enableWavingIcon
          loading={!stations}
          onItemClick={this._goToStationPage}
          scrollbarRef={ref => {
            this.scrollbarRef = ref;
          }}
        />
        {disable && <div className={classes.disabledBackdrop} />}
      </div>
    );
  }
}

StationSwitcher.propTypes = {
  classes: PropTypes.any,
  currentStation: PropTypes.object,
  history: PropTypes.object,
  disable: PropTypes.bool,
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
