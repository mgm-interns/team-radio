import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';

import Playlist from 'Page/Station/Playlist';
import classNames from 'classnames';

import styles from './styles';
import pins from './fixtures';

/* eslint-disable no-shadow */
class FilterPins extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.switcherContainer}>
          <Typography type="subheading" className={classes.titleLabel}>
            {"Hear the tracks you've saved"}
          </Typography>
          <Playlist className={{ height: 600 }} playlist={pins.playlist} />
        </Grid>
      </Grid>
    );
  }
}

FilterPins.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(FilterPins);
