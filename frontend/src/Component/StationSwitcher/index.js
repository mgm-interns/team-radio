import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'material-ui/styles/withStyles';
import { CircularProgress } from 'material-ui/Progress';
import Slider from 'react-slick';
import { fetchStations } from '../../Redux/api/stations/actions';
import { transformNumber } from '../../Transformer';
import Images from '../../Theme/Images';
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
  };
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
    this._renderSwitcher = this._renderSwitcher.bind(this);
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
    return isMobile ? width / 100 : Math.floor(width / 120);
  }

  _renderSwitcher() {
    const { classes, stationList, stations } = this.props;
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
    stations.map((station, index) => {
      station.avatar = AVATARS_DEFAULT[transformNumber.random(1, 5)].avatar;
    });

    return (
      <div
        className={classes.container}
        ref={ref => {
          this.sliderRef = ref;
        }}
      >
        <Slider {...settings}>
          {stations.map((station, index) => (
            <div
              key={index}
              className={[
                classes.station_wrapper,
                // station.isActive && classes.active_station,
              ]}
            >
              <img src={station.avatar} className={classes.station_avatar} />
              <div className={classes.station_info}>
                <h3 className={classes.station_title}>{station.stationName}</h3>
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

  render() {
    const { stations, classes } = this.props;

    return (
      <div>
        {stations === undefined ? (
          <div className={classes.loadingContainer}>
            <CircularProgress color="primary" thickness={3} size={20} />
          </div>
        ) : (
          this._renderSwitcher()
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ api: { stations } }) => ({
  stations: stations.data.data,
});

const mapDispatchToProps = dispatch => ({
  fetchStations: () => dispatch(fetchStations()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(StationSwitcher);
