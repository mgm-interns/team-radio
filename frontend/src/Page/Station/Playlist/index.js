import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { passiveUserRequest, getNowPlaying } from 'Redux/page/station/actions';
import Grid from 'material-ui/Grid';
import FlipMoveList from 'react-flip-move';
import { withStyles } from 'material-ui/styles';
import orderBy from 'lodash/orderBy';
import Typography from 'material-ui/Typography';
import WarningIcon from 'react-icons/lib/md/warning';
import Item from './Item';
import styles from './styles';

/* eslint-disable no-shadow */
class Playlist extends Component {
  constructor(props) {
    super(props);

    this.getFilteredPlaylist = this.getFilteredPlaylist.bind(this);
  }

  static getSongScore(song) {
    return song.up_vote.length - song.down_vote.length;
  }

  componentWillReceiveProps(nextProps) {}

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
    const { data, nowPlaying, getNowPlaying } = this.props;
    let nowPlayingSong = null;

    const playlistWithoutNowPlaying = data.filter(item => {
      if (item.song_id === nowPlaying.song_id) {
        nowPlayingSong = item;
        return false;
      }
      return true;
    });

    getNowPlaying(nowPlayingSong);

    return {
      nowPlaying: nowPlayingSong,
      playlist: orderBy(
        playlistWithoutNowPlaying,
        [
          ({ song_id }) => (song_id === nowPlaying.song_id ? -1 : 1),
          Playlist.getSongScore,
          'created_date',
        ],
        ['asc', 'desc', 'asc'],
      ),
    };
  }

  render() {
    const { className, classes, style } = this.props;
    const { playlist, nowPlaying } = this.getFilteredPlaylist();

    if (playlist.length === 0 && !nowPlaying) {
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
        style={{
          ...style,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <FlipMoveList
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {nowPlaying && (
            <Item key={nowPlaying.song_id} {...nowPlaying} playing />
          )}
          {playlist.map((song, index) => (
            <Item key={song.song_id || index} {...song} />
          ))}
        </FlipMoveList>
      </Grid>
    );
  }
}

Playlist.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.any,
  style: PropTypes.any,
  data: PropTypes.array,
  nowPlaying: PropTypes.object,
  getNowPlaying: PropTypes.func,
  passiveUserRequest: PropTypes.func,
  favouriteList: PropTypes.array,
};

const mapStateToProps = ({ api }) => ({
  nowPlaying: api.currentStation.nowPlaying,
  favouriteList: api.currentStation.favouriteList,
});

const mapDispatchToProps = dispatch => ({
  passiveUserRequest: passive => dispatch(passiveUserRequest(passive)),
  getNowPlaying: data => dispatch(getNowPlaying(data)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Playlist);
