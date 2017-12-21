import React, { Component } from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Slider from 'react-slick';
import styles from './styles';

class StationSwitcher extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { stationList, classes } = this.props;
    const { width } = this.state;
    const isMobile = width <= 500;

    const settings = {
      dots: !isMobile,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile
        ? Math.floor(width / 100)
        : Math.floor(width / 130),
      slidesToScroll: 1,
      swipeToSlide: true,
    };

    return (
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
    );
  }
}

export default withStyles(styles)(StationSwitcher);
