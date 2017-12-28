let station = {
  id: '',
  name: '',
  playlist: [],
  startTime: null,
};

import * as songController from './song';
import * as players from '../players';

export const addStation = async (stationName, userId) => {
  // TODO: convert stationName to stationId
  return Promise.resolve(station);
};

export const getStation = async stationId => {};

export const addSong = async (stationId, songUrl, userId) => {
  let song = await songController.getSongDetails(songUrl);
  station.playlist.push({
    id: Date.now() + '',
    url: song.url,
    duration: song.duration,
  });

  players.updatePlaylist(stationId);
  return Promise.resolve(station.playlist);
};

export const updateStartTime = async (stationId, time) => {};

export const setPlayedSongs = async (stationId, songIds) => {
  // return playlist
};

export const getAllAvailableStations = async () => {};
