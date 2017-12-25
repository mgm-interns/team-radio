import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import StationSwitcher from 'Component/StationSwitcher';
import styles from './styles';

class PopularStation extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12} className={classes.stationSwitcher}>
          <StationSwitcher stationList={fixture.stations} />
        </Grid>
      </Grid>
    );
  }
}

PopularStation.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(PopularStation);
