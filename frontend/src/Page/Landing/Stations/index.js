import React from 'react';
import PropTypes from 'prop-types';
import { StationSwitcher } from 'Component';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';
import styles from './styles';

const Stations = ({ classes }) => (
  <Grid direction="row" container className={classes.containerWrapper}>
    <Grid item xs={12} className={classes.switcherContainer}>
      <div className={classes.switcherContent}>
        <StationSwitcher />
      </div>
    </Grid>
  </Grid>
);

Stations.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(Stations);
