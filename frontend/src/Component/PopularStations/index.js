import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import StationSwitcher from './../StationSwitcher';

class PopularStations extends Component {
  static propTypes = {
    stationList: PropTypes.array,
    classes: PropTypes.any,
  };
  render() {
    const { stationList, classes } = this.props;
    const mainStation = stationList[0];
    const otherStations = stationList.slice(1, stationList.length);

    return (
      <div className={classes.stations_container}>
        <div className={classes.stations_primary}>
          <img
            src={mainStation.avatar}
            alt=""
            className={classes.stations_primary_img}
          />
          <h1 className={classes.stationTitle}>{mainStation.name}</h1>
          <span className={classes.stationSubtitle}>
            {mainStation.description}
          </span>
        </div>
        <div className="stations_secondary">
          <StationSwitcher stationList={otherStations} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PopularStations);
