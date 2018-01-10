import _ from 'lodash';
import * as stationController from './controllers/station';
import * as EVENTS from './const/actions';

const _players = [];
const TIME_BUFFER = 5000;
let io = null;

class Player {
  nowPlaying = {
    song_id: 0,
    url: '',
    starting_time: 0,
    thumbnail: '',
  };
  // isPopular needs to be false, but now it is true to test
  isPopular = true;
  constructor(station) {
    this.stationId = station.station_id;
    this.updatePlaylist(station);
  }

  setPopular = status => {
    this.isPopular = status ? true : false;
  };

  skipNowPlayingSong = async songId => {
    if (songId !== this.nowPlaying.song_id) {
      throw new Error(`The song id (${songId}) is not the now playing song id`);
    }
    await stationController.setPlayedSongs(this.stationId, [
      this.nowPlaying.song_id,
    ]);
    this._setPlayableSong();
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
      this._emitStationState();
      if (song) {
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
