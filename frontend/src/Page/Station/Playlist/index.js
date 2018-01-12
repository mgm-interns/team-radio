import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import orderBy from 'lodash/orderBy';
import Typography from 'material-ui/Typography';
import WarningIcon from 'react-icons/lib/md/warning';
import Item from './Item';
import styles from './styles';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.getFilteredPlaylist = this.getFilteredPlaylist.bind(this);
  }

  static getSongScore(song) {
    return song.up_vote.length - song.down_vote.length;
  }

  /**
   * Filter all song that have not been played
   * Then order the list by:
   * - now playing will be on top
   * - higher score higher position
   * - created date
   *
   * @returns {Array}
   */
  getFilteredPlaylist() {
    const { playlist, nowPlaying } = this.props;

    return orderBy(
      playlist,
      [
        ({ song_id }) => (song_id === nowPlaying.song_id ? -1 : 1),
        Playlist.getSongScore,
        'created_date',
      ],
      ['asc', 'desc', 'asc'],
    );
  }

  render() {
    const { className, classes, style } = this.props;
    const playlist = this.getFilteredPlaylist();
    if (playlist.length === 0) {
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
              There is no song in the playlist.
              <br />
              Please add new song.
            </Typography>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto' }}
      >
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {playlist.map((video, index) => (
            <Item key={index} {...video} playing={index === 0} />
          ))}
        </List>
      </Grid>
    );
  }
}

Playlist.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
  playlist: PropTypes.array,
  nowPlaying: PropTypes.object,
};

const mapStateToProps = state => ({
  nowPlaying: state.api.currentStation.nowPlaying,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Playlist);
