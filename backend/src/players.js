import _ from 'lodash';
import * as stationController from './controllers/station';
import * as EVENTS from './const/actions';
import * as switcher from './switcher';

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
    const preSkippedSongs = new Set(this.skippedSongs);
    // Save the user ids
    this.userIds = userIds;
    const playlist = await stationController.getAvailableListSong(this.stationId);
    // Check songs will be skipped
    playlist.forEach(song => {
      // Dem so vote co user
      // Dem so down votes co user
      let points = 0;
      /*
      // Skip song base on upvotes and down votes.
      song.up_vote.forEach(user => {
        userIds.forEach(childUser => {
          if (user.toString() === childUser.toString()) {
            points += 1;
          }
        });
      });
      */
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
    // compare current skipped and preSkippedSongs
    if (this.skippedSongs.size === preSkippedSongs.size) {
      for (let i = 0; i < preSkippedSongs.size; i++) {
        if (!this.skippedSongs.has(preSkippedSongs[i])) {
          this._emitSkippedSongs();
          break;
        }
      }
    } else {
      this._emitSkippedSongs();
    }
  };
  _emitSkippedSongs = () => {
    this._emit(EVENTS.SERVER_UPDATE_SKIPPED_SONGS, this.skippedSongs);
  };
  addSkippedSong = songId => {
    if (this.skippedSongs.has(songId)) {
      return;
    }
    this.skippedSongs.add(songId);
    if (songId === this.nowPlaying.song_id) {
      this.skipNowPlayingSong();
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
    let skipTime = Date.now() - this.nowPlaying.starting_time + TIME_BUFFER;
    if (2 * TIME_BUFFER < skipTime) skipTime = 2 * TIME_BUFFER;
    this._emitSkippedSong(skipTime);
    // TODO: setSkippedSong not working well now
    await stationController.setSkippedSong(
      this.stationId,
      this.nowPlaying.song_id,
    );
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
  _emitHistory = async () => {
    const history = await stationController.getListSongHistory(this.stationId);
    this._emit(EVENTS.SERVER_UPDATE_HISTORY, {
      history: history,
    });
  };

  _emitStationState = async () => {
    this._emitNowPlaying();
    this._emitPlaylist();
    this._emitHistory();
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
  _emitSkippedSong = delay => {
    // Take here to current station working
    this._emitNowPlaying();
    this._emit(EVENTS.SERVER_SKIP_SONG, {
      message: `The song will be skipped after ${Math.floor(
        delay / 1000,
      )}s because the number of online users click down votes is greater 50%`,
      delay: delay,
      now_playing: this.getNowPlaying(),
    });
    this._emitPlaylist();
    this._emitHistory();
    if (this.isPopular) {
      this._emitThumbnail();
    }
  };
  _resetNowPlaying = () => {
    this.nowPlaying = {
      song_id: 0,
      url: '',
      starting_time: 0,
      thumbnail: '',
    };
  };
  _setNowPlaying = (song, starting_time) => {
    this.nowPlaying.song_id = song.song_id;
    this.nowPlaying.url = song.url;
    this.nowPlaying.thumbnail = song.thumbnail;
    this.nowPlaying.starting_time = starting_time;
  }
  // TODO: check change state of the station to update available stations
  _startSong = async (song, starting_time) => {
    try {
      const preSongId = this.nowPlaying.song_id;
      if (!song) {
        this._resetNowPlaying();
        this._emitStationState();
      } else {
        this._setNowPlaying(song, starting_time);
        if (this.skippedSongs.has(song.song_id)) {
          this.skippedSongs.delete(song.song_id);
          // TODO: setSkippedSong not working well now
          await stationController.setSkippedSong(this.stationId, song.song_id);
          this._emitSkippedSong(TIME_BUFFER);
          this._nextSongByTimeout(TIME_BUFFER, this.nowPlaying.song_id);
        } else {
          this._emitStationState();
          stationController.updateStartingTime(
            this.stationId,
            this.nowPlaying.starting_time,
          );
          this._nextSongByTimeout(
            song.duration + TIME_BUFFER,
            this.nowPlaying.song_id,
          );
        }
      }
      // When the state of station was changed
      if (!this.nowPlaying.song_id !== !preSongId) {
        switcher.checkUpdatePopularStations();
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  _nextSongByTimeout = (timeout, playingSongId) => {
    setTimeout(async () => {
      // The song was not skipped
      if (playingSongId === this.nowPlaying.song_id) {
        await stationController.setPlayedSongs(this.stationId, [
          this.nowPlaying.song_id,
        ]);
        stationController.addPointsByPlayedSong(this.stationId, this.nowPlaying.song_id);
        this.skippedSongs.delete(playingSongId);
        this._setPlayableSong();
      }
    }, timeout);
  };
  // TODO: [start server, add new song to empty station, next song nomarly]
  _setPlayableSong = async (station = null) => {
    if (!station) {
      station = await stationController.getStation(this.stationId);
    }
    const { playlist } = station;
    // Filter songs wasn't played and is not the current playing song
    const playablePlaylist = _.filter(playlist, song => !song.is_played);
    playablePlaylist.forEach((song, i) => {
      song.votes = song.up_vote.length - song.down_vote.length;
    });

    // Sort the playablePlaylist by votes and time (current the song_id is the song added time)
    const sortedPlaylist = _.orderBy(
      playablePlaylist,
      ['votes', 'song_id'],
      ['desc', 'asc'],
    );
    // Reset nowPlaying when the station is done
    if (sortedPlaylist.length === 0) {
      this._startSong();
      return;
    }
    // When the player is playing
    if (this.nowPlaying.song_id) {
      // Update nowPlaying song
      const song = sortedPlaylist[0];
      // play the song
      this._startSong(song, Date.now());
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
        this._startSong(song, song.added_time);
        return;
      } else if (preStartingTime + song.duration + TIME_BUFFER > currentTime) {
        // Update is_played of the playedSongs to true
        stationController.setPlayedSongs(this.stationId, playedSongs);
        this._startSong(song, preStartingTime);
        return;
      }
      // Move the song to next song for checking
      preStartingTime += song.duration + TIME_BUFFER;
      playedSongs.push(song.song_id);
    }

    // The available song is not existed
    // Update is_played of the song in the sortedPlaylist to true
    stationController.setPlayedSongs(this.stationId, playedSongs);
    this._startSong();
  };
}

export const init = async () => {
  try {
    const stations = await stationController.getAllStationDetails();
    stations.forEach((station) => {
      station = station.toObject();
      _players[station.station_id] = new Player(station);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const attachWebSocket = _io => {
  io = _io;
  switcher.attachWebSocket(_io);
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
    return (await getPlayer(stationId)).getNowPlaying();
  } catch (err) {
    throw err;
  }
};
export const getPlayingStationIds = () => {
  const playingStationIds = [];
  _players.forEach((player, stationId) => {
    if (player.getNowPlaying().song_id)
      playingStationIds.push(stationId);
  });
  return playingStationIds;
}
