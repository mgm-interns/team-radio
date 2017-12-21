import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

import StationSwitcher from '../../../Component/StationSwitcher';

class PopularStation extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.stationsContainer}>
        <Grid item className={classes.stationsWrapper}>
          <Grid item xs={12} className={classes.stationSecondary}>
            <StationSwitcher stationList={fixture.stations} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PopularStation.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(PopularStation);
