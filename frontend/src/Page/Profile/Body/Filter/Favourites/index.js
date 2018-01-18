import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';

import Favourites from 'Page/Profile/Favourites';
import classNames from 'classnames';

import styles from './styles';
import pins from './fixtures';

/* eslint-disable no-shadow */
class FilterFavourites extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.containerWrapper}>
        <Typography type="title">{`Hear the tracks you've saved`}</Typography>
        <Grid item xs={12} className={classes.favouritesContainer}>
          <Favourites favouriteSongs={pins[0].playlist} />
        </Grid>
      </Grid>
    );
  }
}

FilterFavourites.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(FilterFavourites);
