import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

import StationSwitcher from '../../../Component/StationSwitcher';

class PopularStation extends Component {
  render() {
    const { classes } = this.props;

    const mainStation = fixture.stations[0];
    return (
      <Grid container xs={12} className={classes.stationsContainer}>
        <Grid container xs={12} className={classes.stationsWrapper}>
          <Grid container xs={12} className={classes.stationPrimary}>
            <Grid item xs={6}>
              <img
                src={mainStation.avatar}
                alt="Most popular station"
                className={classes.stationPrimaryAvatar}
              />
            </Grid>
            <Grid item xs={6}>
              <h3 className={classes.stationPrimaryTitle}>
                {mainStation.name}
              </h3>
              <span className={classes.stationPrimarySubTitle}>
                {mainStation.description}
              </span>
            </Grid>
          </Grid>
          <Grid item xs className={classes.stationSecondary}>
            <StationSwitcher stationList={fixture.stations} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PopularStation);
