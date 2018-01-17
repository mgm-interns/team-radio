import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';

import Favorites from 'Page/Profile/Favorites';
import classNames from 'classnames';

import styles from './styles';
import pins from './fixtures';

/* eslint-disable no-shadow */
class FilterFavorites extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={12} className={classes.switcherContainer}>
          <Favorites favoriteSongs={pins[0].playlist} />
        </Grid>
      </Grid>
    );
  }
}

FilterFavorites.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(FilterFavorites);
