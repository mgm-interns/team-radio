import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Scrollbar from 'react-scrollbar';
import { withStyles } from 'material-ui/styles';
import orderBy from 'lodash/orderBy';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import WarningIcon from 'react-icons/lib/md/warning';
import Item from './Item';
import styles from './styles';

class Favorites extends Component {
  /**
   * Filter all song that have not been played
   * Then order the list by:
   * - now playing will be on top
   * - higher score higher position
   * - created date
   *
   * @returns {Array}
   */
  // getFilteredFavorites() {
  //   const { favoriteSongs, nowPlaying } = this.props;
  //
  //   return orderBy(
  //     favoriteSongs,
  //     [
  //       ({ song_id }) => (song_id === nowPlaying.song_id ? -1 : 1),
  //       Favorites.getSongScore,
  //       'created_date',
  //     ],
  //     ['asc', 'desc', 'asc'],
  //   );
  // }

  render() {
    const { className, classes, style, favoriteSongs } = this.props;

    if (favoriteSongs.length === 0) {
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
              Please favorite any song.
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid item xs={12}>
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          <GridListTile
            cols={2}
            style={{
              height: 'auto',
            }}
          >
            <Subheader component="div">{`Hear the tracks you've saved`}</Subheader>
          </GridListTile>
          {favoriteSongs.map((video, index) => <Item key={index} {...video} />)}
        </GridList>
      </Grid>
    );
  }
}

Favorites.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.any,
  style: PropTypes.any,
  favoriteSongs: PropTypes.array,
};

const mapStateToProps = state => ({});

export default compose(withStyles(styles), connect(mapStateToProps))(Favorites);
