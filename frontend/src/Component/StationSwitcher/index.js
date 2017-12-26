import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'material-ui/styles/withStyles';
import { CircularProgress } from 'material-ui/Progress';
import Slider from 'react-slick';
import { fetchStations } from 'Redux/api/stations';
import { transformNumber } from 'Transformer';
import Images from 'Theme/Images';
import styles from './styles';

const { avatar1, avatar2, avatar3, avatar4, avatar5 } = Images.fixture;
const AVATARS_DEFAULT = {
  1: { avatar: avatar1 },
  2: { avatar: avatar2 },
  3: { avatar: avatar3 },
  4: { avatar: avatar4 },
  5: { avatar: avatar5 },
};

class StationSwitcher extends Component {
  static propTypes = {
    classes: PropTypes.any,
    stationList: PropTypes.array,
    fetchStations: PropTypes.func,
    stations: PropTypes.array,
    history: PropTypes.object,
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
    this.props.fetchStations();
  }

  _handleWindowSizeChange = () => {
    if (this.sliderRef) {
      this.setState({ width: this.sliderRef.clientWidth });
    }
  };

  _slidesToShow(width, isMobile) {
    return isMobile ? Math.floor(width / 100) : Math.floor(width / 140);
  }

  _goToStationPage(station) {
    this.props.history.push(`station/${station.station_name}`);
  }

  _renderSwitcher() {
    const { classes, stations } = this.props;
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

    // Demo
    const customStations = stations.map(station => ({
      ...station,
      avatar: AVATARS_DEFAULT[transformNumber.random(1, 5)].avatar,
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
              className={[
                classes.station_wrapper,
                // station.isActive && classes.active_station,
              ]}
              onClick={() => this._goToStationPage(station)}
            >
              <img src={station.avatar} className={classes.station_avatar} />
              <div className={classes.station_info}>
                <span className={classes.station_title}>
                  {station.station_name}
                </span>
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

const mapStateToProps = ({ api: { stations } }) => ({
  stations: stations.fetch.data,
});

const mapDispatchToProps = dispatch => ({
  fetchStations: () => dispatch(fetchStations()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationSwitcher);
