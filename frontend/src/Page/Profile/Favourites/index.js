import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import GridList from 'material-ui/GridList';
import WarningIcon from 'react-icons/lib/md/warning';

import Item from './Item';
import styles from './styles';

const Favourites = ({ className, classes, favouriteSongs, userId }) => {
  if (favouriteSongs.length === 0) {
    return (
      <Grid item xs={12} className={className}>
        <Grid
          container
          justify={'center'}
          alignItems={'center'}
          alignContent={'center'}
          direction={'column'}
          className={classes.emptyContainer}
        >
          <WarningIcon className={classes.emptyIcon} />
          <Typography
            type={'title'}
            align={'center'}
            className={classes.emptyText}
          >
            There is no song in your list.
            <br />
            Please favourite any song.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
      {favouriteSongs.map((video, index) => (
        <Item key={index} userId={userId} {...video} />
      ))}
    </GridList>
  );
};

Favourites.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.any,
  style: PropTypes.any,
  favouriteSongs: PropTypes.array,
};

export default compose(withStyles(styles))(Favourites);
