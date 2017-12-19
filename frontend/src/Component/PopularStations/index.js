import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import StationSwitcher from './../StationSwitcher';

class PopularStations extends Component {
  render() {
    const { stationList } = this.props;
    const mainStation = stationList[0];
    const otherStations = stationList.slice(1, stationList.length);
    const classes = this.props.classes;

    return (
      <div className={classes.stations_container}>
        <div className={classes.stations_primary}>
          <img
            src={mainStation.avatar}
            alt=""
            className={classes.stations_primary_img}
          />
          <h1 className={classes.station_title}>{mainStation.name}</h1>
          <span className={classes.station_subtitle}>
            {mainStation.description}
          </span>
        </div>

        <div className="stations_secondary">
          <StationSwitcher stationList={stationList} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PopularStations);
