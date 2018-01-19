import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles/index';

import Favourites from 'Page/Profile/Favourites';
import { getFavouriteSongs } from 'Redux/api/favouriteSongs/actions';

import styles from './styles';
import pins from './fixtures';

/* eslint-disable no-shadow */
class FilterFavourites extends Component {
  componentDidMount() {
    this.props.getFavouriteSongs('5a5f285889e2421cf07ed0f8');
  }

  render() {
    const { classes, favouriteSongs } = this.props;

    return (
      <Grid container className={classes.containerWrapper}>
        <Typography type="title">{`Hear the tracks you've saved`}</Typography>
        <Grid item xs={12} className={classes.favouritesContainer}>
          <Favourites favouriteSongs={favouriteSongs.data} />
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
  favouriteSongs: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  user: api.user,
  favouriteSongs: api.favouriteSongs,
});

const mapDispatchToProps = dispatch => ({
  getFavouriteSongs: userId => dispatch(getFavouriteSongs(userId)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FilterFavourites);
