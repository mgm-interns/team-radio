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
    let stations = await stationController.getAllAvailableStations();
    stations.forEach(station => {
        _players[station.id] = new Player(station);
    });
};
export const getPlayer = stationId => {
    return _players[stationId];
};
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

    getNowPlaying = () => {
        return this.nowPlaying;
    };

    updatePlaylist = async () => {
        // TODO: Resume when restart server
        if (this.nowPlaying.url) {
            return;
        }
        let station = await stationController.getStation(this.stationId);
        let playlist = station.playlist;
        let song = this._getPlayableSong(playlist);

        if (song) {
            this._startSong(song);
        } else {
            console.log('no song');
            throw 'no song';
        }
    };

    _emitNowPlaying = () => {
        this._emit(EVENTS.SERVER_NOW_PLAYING, this.nowPlaying);
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
            let playlist = await stationController.setPlayedSongs(this.stationId, [
                this.nowPlaying.songId,
            ]);
            let song = this._getPlayableSong(playlist);
            this._startSong(song);
        }, timeout);
    };

    _getPlayableSong = playlist => {
        let filteredPlaylist = _.sortBy(playlist, [
            song => {
                return !song.isPlayed;
            },
        ]);
        // let sortedPlaylist = _.sortBy(filteredPlaylist, [function(song) { return song.score; }]);
        let sortedPlaylist = filteredPlaylist;
        return sortedPlaylist[0];
    };
}