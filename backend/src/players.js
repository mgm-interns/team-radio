import _ from 'lodash';
import * as stationController from './controllers/station';
import * as EVENTS from './const/actions';

const _players = [];
const TIME_BUFFER = 5000;
const PERCENT_SKIP_SONG = 50;
let io = null;

class Player {
  userIds = [];
  nowPlaying = {
    song_id: 0,
    url: '',
    starting_time: 0,
    thumbnail: '',
  };
  skippedSongs = new Set();
  // isPopular needs to be false, but now it is true to test
  isPopular = true;

  constructor(station) {
    this.stationId = station.station_id;
    this.updatePlaylist(station);
  }
  updateOnlineUsers = async userIds => {
    // Save the user ids
    this.userIds = userIds;
    const playlist = await stationController.getListSong(this.stationId);
    // Check songs will be skipped
    playlist.forEach(song => {
      // Dem so vote co user
      // Dem so downvote co user
      let points = 0;
      song.up_vote.forEach(user => {
        userIds.forEach(childUser => {
          if (user.toString() === childUser.toString()) {
            points += 1;
          }
        });
      });
      song.down_vote.forEach(user => {
        userIds.forEach(childUser => {
          if (user.toString() === childUser.toString()) {
            points -= 1;
          }
        });
      });
      if (-points / userIds.size > PERCENT_SKIP_SONG / 100) {
        this.addSkippedSong(song.song_id);
      } else {
        this.removeSkippedSong(song.song_id);
      }
    });
  };
  addSkippedSong = songId => {
    if (songId === this.nowPlaying.song_id) {
      this.skipNowPlayingSong();
    } else {
      this.skippedSongs.add(songId);
    }
    // TODO: check this.nowPlaying.song_id
  };
  removeSkippedSong = songId => {
    this.skippedSongs.delete(songId);
  };

  setPopular = status => {
    this.isPopular = status;
  };

  skipNowPlayingSong = async () => {
    // Maybe dot not need to call the below statement
    this.skippedSongs.delete(this.nowPlaying.song_id);
    // Make sure the nowPlaying song is set to be is_played
    await stationController.setPlayedSongs(this.stationId, [
      this.nowPlaying.song_id,
    ]);
    // TODO: setSkippedSong not working well now
    await stationController.setSkippedSong(
      this.stationId,
      this.nowPlaying.song_id,
    );
    this._emitSkippedSong();
    // when the rest time of the now playing song is less than 2 * TIME_BUFFER
    // Them timeout for next song will is the less time
    this._nextSongByTimeout(2 * TIME_BUFFER, this.nowPlaying.song_id);
  };

  getNowPlaying = () => ({
    song_id: this.nowPlaying.song_id,
    url: this.nowPlaying.url,
    starting_time: this.nowPlaying.starting_time
      ? Date.now() - this.nowPlaying.starting_time
      : 0,
    thumbnail: this.nowPlaying.thumbnail,
  });

  updatePlaylist = async (station = null) => {
    if (this.nowPlaying.url) {
      // When the player is running (the url exists), do nothing
      return;
    }

    if (!station) {
      // Get the station if it is not available
      station = await stationController.getStation(this.stationId);
    }
    this._setPlayableSong(station);
  };

  _emitNowPlaying = () => {
    this._emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, this.getNowPlaying());
  };

  _emitPlaylist = async () => {
    const playlist = await stationController.getListSong(this.stationId);
    this._emit(EVENTS.SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  };

  _emitStationState = async () => {
    this._emitNowPlaying();
    this._emitPlaylist();
    if (this.isPopular) {
      this._emitThumbnail();
    }
  };

  _emit = (eventName, payload) => {
    io.to(this.stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  };
  _emitThumbnail = () => {
    this._emitAll(EVENTS.SERVER_CHANGE_STATION_THUMBNAIL, {
      station_id: this.stationId,
      thumbnail: this.nowPlaying.thumbnail,
    });
  };
  _emitAll = (eventName, payload) => {
    io.emit('action', {
      type: eventName,
      payload: payload,
    });
  };
  _emitSkippedSong = () => {
    this._emit(EVENTS.SERVER_SKIP_SONG, this.getNowPlaying());
  };
  _resetNowPlaying = () => {
    this.nowPlaying = {
      song_id: 0,
      url: '',
      starting_time: 0,
      thumbnail: '',
    };
    this._emitStationState();
  };
  _startSong = async song => {
    try {
      if (!song) {
        this._emitStationState();
        return;
      }
      if (this.skippedSongs.has(song.song_id)) {
        // The song needs to skipped
        // delete the song in skippedSongs
        this.skippedSongs.delete(song.song_id);
        // TODO: setSkippedSong not working well now
        await stationController.setSkippedSong(this.stationId, song.song_id);
        // send _emit
        this._emitSkippedSong();
        this._nextSongByTimeout(TIME_BUFFER, this.nowPlaying.song_id);
      } else {
        this._emitStationState();
        // Update starting time in the station
        stationController.updateStartingTime(
          this.stationId,
          this.nowPlaying.starting_time,
        );
        this._nextSongByTimeout(
          song.duration + TIME_BUFFER,
          this.nowPlaying.song_id,
        );
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  _nextSongByTimeout = (timeout, playingSongId) => {
    setTimeout(async () => {
      if (playingSongId === this.nowPlaying.song_id) {
        await stationController.setPlayedSongs(this.stationId, [
          this.nowPlaying.song_id,
        ]);
        this._setPlayableSong();
      }
    }, timeout);
  };
  // TODO: [start server, add new song to empty station, next song nomarly]
  _setPlayableSong = async (station = null) => {
    if (!station) {
      // Get the station if it is not available
      station = await stationController.getStation(this.stationId);
    }
    const { playlist } = station;
    // Filter songs wasn't played and is not the current playing song
    const filteredPlaylist = _.filter(playlist, song => !song.is_played);
    filteredPlaylist.forEach((song, i) => {
      song.votes = song.up_vote.length - song.down_vote.length;
    });

    // console.log('Playlist with votes:', filteredPlaylist, Date.now());
    // Sort the filteredPlaylist by votes and time (current the song_id is the song added time)
    const sortedPlaylist = _.orderBy(
      filteredPlaylist,
      ['votes', 'song_id'],
      ['desc', 'asc'],
    );
    // Reset nowPlaying when the station is done
    if (sortedPlaylist.length === 0) {
      this._resetNowPlaying();
      return;
    }
    // When the player is playing
    if (this.nowPlaying.song_id) {
      // Update nowPlaying song
      const song = sortedPlaylist[0];
      this.nowPlaying.song_id = song.song_id;
      this.nowPlaying.url = song.url;
      this.nowPlaying.starting_time = Date.now();
      this.nowPlaying.thumbnail = song.thumbnail;
      // play the song
      this._startSong(song);
      return;
    }

    const currentTime = Date.now();
    let preStartingTime = station.starting_time;
    const playedSongs = [];
    // TODO: explain clearly in comments
    // TODO: stationController.setPlayedSongs to ids
    // DO NOT use foreach (can't be stop the loop)
    for (let i = 0; i < sortedPlaylist.length; i++) {
      const song = sortedPlaylist[i];
      // current the song_id is song added time
      song.added_time = song.song_id;
      // Check the song is new or not
      if (song.added_time + song.duration + TIME_BUFFER > currentTime) {
        // Update is_played of the playedSongs to true
        stationController.setPlayedSongs(this.stationId, playedSongs);
        // Update nowPlaying song
        this.nowPlaying.song_id = song.song_id;
        this.nowPlaying.url = song.url;
        this.nowPlaying.thumbnail = song.thumbnail;
        this.nowPlaying.starting_time = song.added_time;
        // play the song
        this._startSong(song);
        return;
      } else if (preStartingTime + song.duration + TIME_BUFFER > currentTime) {
        // Update is_played of the playedSongs to true

        stationController.setPlayedSongs(this.stationId, playedSongs);
        // Update nowPlaying song
        this.nowPlaying.song_id = song.song_id;
        this.nowPlaying.url = song.url;
        this.nowPlaying.thumbnail = song.thumbnail;
        this.nowPlaying.starting_time = preStartingTime;
        // play the song
        this._startSong(song);
        return;
      }
      // Move the song to next song for checking
      preStartingTime += song.duration + TIME_BUFFER;
      playedSongs.push(song.song_id);
    }

    // The available song is not existed
    // Update is_played of the song in the sortedPlaylist to true
    stationController.setPlayedSongs(this.stationId, playedSongs);
    // Update nowPlaying song is not available
    this._resetNowPlaying();
  };
}

export const init = async () => {
  try {
    const stations = await stationController.getAllStationDetails();
    // console.log('stations: ', stations);
    stations.forEach((station, i) => {
      station = station.toObject();
      _players[station.station_id] = new Player(station);
    });
  } catch (err) {
    console.log(err);
  }
};

export const attachWebSocket = _io => {
  io = _io;
  init();
};

export const getPlayer = async stationId => {
  if (!stationId) {
    throw new Error(`The station id can't be empty`);
  }
  if (!_players[stationId]) {
    const station = await stationController.getStation(stationId);
    // check the stationdId is available or not
    if (!station) {
      throw new Error('Station ID is not available');
    }
    // Create new player station
    _players[stationId] = new Player(station);
  }
  return _players[stationId];
};

export const updatePlaylist = async stationId => {
  try {
    (await getPlayer(stationId)).updatePlaylist();
  } catch (err) {
    throw err;
  }
};

export const getNowPlaying = async stationId => {
  try {
    return getPlayer(stationId).getNowPlaying();
  } catch (err) {
    throw err;
  }
};
