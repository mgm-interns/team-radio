import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import StationSwitcher from './../StationSwitcher';
import Grid from 'material-ui/Grid';

class PopularStations extends Component {
  render() {
    const { stationList } = this.props;
    const mainStation = stationList[0];
    const otherStations = stationList.slice(1, stationList.length);
    const classes = this.props.classes;

    return (
      <Grid container>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PopularStations);
