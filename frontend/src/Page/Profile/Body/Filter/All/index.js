import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

import { StationSwitcher } from 'Component';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';
import styles from './styles';

/* eslint-disable no-shadow */
class FilterAll extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.switcherContainer}>
          <Typography type="subheading" className={classes.titleLabel}>
            My Stations
          </Typography>
          <div className={classes.switcherContent}>
            <StationSwitcher />
          </div>
        </Grid>
      </Grid>
    );
  }
}

FilterAll.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(FilterAll);
