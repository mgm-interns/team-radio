import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import { joinStation } from 'Redux/api/currentStation/actions';
import { Scrollbars } from 'react-custom-scrollbars';
import { transformText } from 'Transformer';
import Images from 'Theme/Images';
import { withNotification } from 'Component/Notification';
import styles from './styles';

class StationSwitcher extends Component {
  static propTypes = {
    classes: PropTypes.any,
    currentStation: PropTypes.object,
    history: PropTypes.object,
    joinStationRequest: PropTypes.func,
    stations: PropTypes.any,
    stationList: PropTypes.array,
    fetchStations: PropTypes.func,
    match: PropTypes.object,
    notification: PropTypes.object,
  };

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
      notification,
    } = this.props;
    // Only change to new station if the id has changed
    if (station.id !== stationId) {
      history.replace(`/station/${station.id}`);
      joinStationRequest(station.id);
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
        (currentStation.station && currentStation.station.id) === station.id,
      avatar: Images.fixture.avatar1,
    }));
    // Move the current station to the first position of array
    filteredStations.sort(({ id }) => (id === stationId ? -1 : 1));

    return (
      <Scrollbars
        className={classes.container}
        renderView={() => <div className={classes.scrollArea} />}
        ref={ref => {
          this.scrollBar = ref;
        }}
      >
        {filteredStations.map((station, index) => (
          <div
            key={index}
            className={`${classes.stationWrapper} ${station.isActive &&
              classes.activeStation}`}
            onClick={() => this._goToStationPage(station)}
          >
            <img src={station.avatar} className={classes.stationAvatar} />
            <div className={classes.stationInfo}>
              <Tooltip
                id={station.id}
                title={station.station_name}
                placement={'right'}
              >
                <span className={classes.stationTitle}>
                  {transformText.reduceByCharacters(station.station_name, 10)}
                </span>
              </Tooltip>
            </div>
          </div>
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

const mapStateToProps = ({ api }) => ({
  stations: api.stations.data,
  currentStation: api.currentStation,
});

const mapDispatchToProps = dispatch => ({
  joinStationRequest: stationId => dispatch(joinStation(stationId)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withNotification,
)(StationSwitcher);
