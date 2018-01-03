import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';
import Slider from 'react-slick';
import { joinStation } from 'Redux/api/currentStation/actions';
import { transformNumber, transformText } from 'Transformer';
import Images from 'Theme/Images';
import { withNotification } from 'Component/Notification';
import styles from './styles';

const { avatar1, avatar2, avatar3, avatar4, avatar5 } = Images.fixture;
const AVATARS_DEFAULT = {
  '1': { avatar: avatar1 },
  '2': { avatar: avatar2 },
  '3': { avatar: avatar3 },
  '4': { avatar: avatar4 },
  '5': { avatar: avatar5 },
};

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

    this.state = {
      width: window.innerWidth,
    };
    this._renderSwitcher = this._renderSwitcher.bind(this);
    this._goToStationPage = this._goToStationPage.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this._handleWindowSizeChange);
  }

  componentDidMount() {
    this._handleWindowSizeChange();
  }

  _handleWindowSizeChange = () => {
    if (this.sliderRef) {
      this.setState({ width: this.sliderRef.clientWidth });
    }
  };

  _slidesToShow(width, isMobile) {
    return isMobile ? Math.floor(width / 110) : Math.floor(width / 180);
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
    }
    notification.app.success({
      message: `Switch to station ${station.station_name}`,
    });
  }

  _renderSwitcher() {
    const { classes, stations, currentStation } = this.props;
    const { width } = this.state;
    const isMobile = width <= 568;
    const slidesToShow = this._slidesToShow(width, isMobile);
    const settings = {
      speed: 500,
      slidesToShow,
      slidesToScroll: Math.min(stations.length, slidesToShow),
      swipeToSlide: true,
      infinite: false,
    };

    const customStations = stations.map(station => ({
      ...station,
      isActive:
        (currentStation.station && currentStation.station.id) === station.id,
      avatar: AVATARS_DEFAULT[transformNumber.random(1, 1)].avatar,
    }));

    return (
      <div
        className={classes.container}
        ref={ref => {
          this.sliderRef = ref;
        }}
      >
        <Slider {...settings}>
          {customStations.map((station, index) => (
            <div
              key={index}
              className={`${classes.station_wrapper} ${station.isActive &&
                classes.active_station}`}
              onClick={() => this._goToStationPage(station)}
            >
              <img src={station.avatar} className={classes.station_avatar} />
              <div className={classes.station_info}>
                <Tooltip
                  id={station.id}
                  title={station.station_name}
                  placement={'right'}
                >
                  <span className={classes.station_title}>
                    {transformText.reduceByCharacters(station.station_name, 10)}
                  </span>
                </Tooltip>
                {/*
                <span className={classes.station_subtitle}>
                  {station.description}
                </span>
                */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <div className={classes.loadingContainer}>
        <CircularProgress color="primary" thickness={3} size={20} />
      </div>
    );
  }

  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <div className={classes.loadingContainer}>
        <p>Create your first station.</p>
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
