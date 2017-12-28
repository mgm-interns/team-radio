import _ from 'lodash';
import * as stationController from './controllers/station';
import * as EVENTS from './const/actions';

const _players = {};
const TIME_BUFFER = 5000;
let io = null;

export const attachWebSocket = _io => {
  io = _io;
};
export const init = async () => {
  const stations = await stationController.getAllAvailableStations();
  stations.forEach(station => {
    _players[station.id] = new Player(station);
  });
};
export const getPlayer = stationId => _players[stationId];
export const updatePlaylist = stationId => {
  _players[stationId].updatePlaylist();
};

class Player {
  intervalId = null;
  nowPlaying = {
    songId: 0,
    url: '',
    startTime: 0,
  };
  constructor(station) {
    this.stationId = station.id;
    this.updatePlaylist();
  }

  getNowPlaying = () => this.nowPlaying;

  updatePlaylist = async () => {
    // TODO: Resume when restart server
    if (this.nowPlaying.url) {
      return;
    }
    const station = await stationController.getStation(this.stationId);
    const playlist = station.playlist;
    const song = this._getPlayableSong(playlist);

    if (song) {
      this._startSong(song);
    } else {
      console.log('no song');
      throw 'no song';
    }
  };

  _emitNowPlaying = () => {
    this._emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, {
      nowPlaying: this.nowPlaying,
    });
  };

  _emit = (eventName, payload) => {
    io.to(this.stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  };

  _startSong = async song => {
    try {
      await stationController.updateStartTime(this.stationId, Date.now());
      this.nowPlaying.songId = song.id;
      this.nowPlaying.url = song.url;
      this._startTimeCounter();
      this._nextSongByTimeout(song.duration + TIME_BUFFER);
      this._emitNowPlaying();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  _startTimeCounter = () => {
    this.nowPlaying.startTime = 0;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.nowPlaying.startTime += 1000;
    }, 1000);
  };

  _nextSongByTimeout = timeout => {
    setTimeout(async () => {
      const playlist = await stationController.setPlayedSongs(this.stationId, [
        this.nowPlaying.songId,
      ]);
      const song = this._getPlayableSong(playlist);
      this._startSong(song);
    }, timeout);
  };

  _getPlayableSong = playlist => {
    const filteredPlaylist = _.sortBy(playlist, [song => !song.isPlayed]);
    // let sortedPlaylist = _.sortBy(filteredPlaylist, [function(song) { return song.score; }]);
    const sortedPlaylist = filteredPlaylist;
    return sortedPlaylist[0];
  };
}
