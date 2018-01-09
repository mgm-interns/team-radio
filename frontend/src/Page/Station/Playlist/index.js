import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
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

  getFilteredPlaylist() {
    const { playlist, nowPlaying } = this.props;
    // Filter all song that have not been played
    const sortedPlaylist = playlist
      ? playlist.filter(song => song.is_played === false)
      : [];
    // Sort the list
    sortedPlaylist.sort((songA, songB) => {
      // Push now playing to the first position
      if (songA.url === nowPlaying.url) {
        return -2;
      }
      const scoreA = Playlist.getSongScore(songA);
      const scoreB = Playlist.getSongScore(songB);
      // Compare the rest songs based on scores
      if (scoreA > scoreB) {
        return -1;
      }
      if (scoreA < scoreB) {
        return 1;
      }
      // when score is equal
      return songA.created_day > songB.created_day ? 1 : -1;
    });
    console.log(sortedPlaylist);
    console.log(nowPlaying);
    // Push now playing to the first position
    sortedPlaylist.sort(song => (song.song_id === nowPlaying.song_id ? -1 : 1));

    return sortedPlaylist;
  }

  render() {
    const { className, style } = this.props;
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto' }}
      >
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {this.getFilteredPlaylist().map((video, index) => (
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
  playlist: state.api.currentStation.playlist,
  nowPlaying: state.api.currentStation.nowPlaying,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Playlist);
