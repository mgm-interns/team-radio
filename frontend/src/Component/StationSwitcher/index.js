import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Slider from 'react-slick';
import styles from './styles';
import { log } from 'util';

class StationSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.handleWindowSizeChange();
  }

  handleWindowSizeChange = () => {
    if (this.sliderRef) {
      this.setState({ width: this.sliderRef.clientWidth });
    }
  };

  slidesToShow(width, isMobile) {
    return isMobile ? width / 100 : Math.floor(width / 120);
  }

  render() {
    const { stationList, classes } = this.props;
    const { width } = this.state;
    const isMobile = width <= 568;
    const slidesToShow = this.slidesToShow(width, isMobile);

    const settings = {
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: Math.min(stationList.length, slidesToShow),
      swipeToSlide: true
    };

    return (
      <div
        className={classes.container}
        ref={ref => {
          this.sliderRef = ref;
        }}
      >
        <Slider {...settings}>
          {stationList.map((station, index) => (
            <div
              key={index}
              className={[
                classes.station_wrapper,
                station.isActive && classes.active_station,
              ]}
            >
              <img
                src={station.avatar}
                alt=""
                className={classes.station_avatar}
              />
              <div className={classes.station_info}>
                <h3 className={classes.station_title}>{station.name}</h3>
                <span className={classes.station_subtitle}>
                  {station.description}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

StationSwitcher.propTypes = {
  stationList: PropTypes.array,
  classes: PropTypes.any,
};

export default withStyles(styles)(StationSwitcher);
