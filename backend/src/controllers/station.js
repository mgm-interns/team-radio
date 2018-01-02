/* eslint-disable */
import * as songController from './song';
import * as players from '../players';
import * as stationModels from './../models/station';
import { statSync } from 'fs';

const MAX_SONG_UNREGISTED_USER_CAN_ADD = 3;

export const addStation = async (stationName, userId) => {
  console.log('station name : ' + stationName);
  if (!stationName) {
    throw 'The station name is empty !';
  } else {
    try {
      let availableStation = await stationModels.getStationByName(stationName);
      if (!availableStation) {
        let stationId = await _createStationId(stationName);
        let currentStation = await stationModels.addStation({
          station_name: stationName,
          id: stationId,
        });
        return currentStation;
      } else {
        throw 'The station name is available';
      }
    } catch (err) {
      console.log(err);
    }
  }
};

// get a statio by id
export const getStation = async stationId => {
  let station = await stationModels.getStationById(stationId);
  if (!station) {
    throw 'Have not station !';
  } else {
    return station;
  }
};
// add a son of station
/** 
 * station.playlist.push({
    id: Date.now() + '',
    url: song.url,
    duration: song.duration,
  });
*/
export const addSong = async (stationId, songUrl, userId = null) => {
  let station;
  try {
    station = await stationModels.getStationById(stationId);
  } catch (err) {
    throw err;
  }
  if (!station) {
    throw new Error('The station id is not existed');
  }
  if (!userId) {
    let numOfSongsAddedByUnregistedUsers = 0;
    station.playlist.forEach((song, index) => {
      if (!song.creator_id && song.is_played == false) {
        numOfSongsAddedByUnregistedUsers++;
        if (
          numOfSongsAddedByUnregistedUsers === MAX_SONG_UNREGISTED_USER_CAN_ADD
        ) {
          throw new Error(
            `When a playlist contains three or more songs from unregistered users,` +
              ` new songs can only be entered by logged in users`,
          );
        }
      }
    });
  }

  let songDetail = await songController.getSongDetails(songUrl);
  if (!songDetail) {
    throw new Error('The song url is not available !');
  }
  try {
    // TODO: test => song_id: new Date().getTime()
    let song = {
      //  song_id: new Date().getTime(),
      is_played: false,
      url: songDetail.url,
      title: songDetail.title,
      thumbnail: songDetail.thumbnail,
      duration: songDetail.duration,
      creator_id: userId,
    };
    await stationModels.addSong(stationId, song);
    station = await stationModels.getStationById(stationId);
    //players.updatePlaylist(station);
    return station.playlist;
    // return Promise.resolve(station.playlist);
  } catch (err) {
    console.log('Error of add song : ' + err);
    throw err;
  }
};

export const updateStartingTime = async (stationId, time) => {
  return await stationModels.updateTimeStartingOfStation(stationId, time);
};

// To stationId and set songIds from false to true
export const setPlayedSongs = async (stationId, songIds) => {
  const currentPlaylist = await getListSong(stationId);
  // console.log(currentPlaylist);
  if (currentPlaylist) {
    for (let i = 0; i < songIds.length; i++) {
      for (let j = 0; j < currentPlaylist.length; j++) {
        if (currentPlaylist[j].song_id === songIds[i]) {
          currentPlaylist[j].is_played = true;
        }
      }
    }
  }
  const playlist = await stationModels.updatePlaylistOfStation(
    stationId,
    currentPlaylist,
  );
  return playlist;
};

export const getAllAvailableStations = async () => {
  return await stationModels.getStations();
};

function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}
//
async function _createStationId(stationName) {
  let currentId = _stringToId(stationName);
  let id = currentId;
  let i = 1;
  let nowId = await stationModels.getStationById(id);
  if (!nowId) {
    i = i + 1;
    id = currentId + i;
  } else {
    _createStationId(nowId);
  }
  return id;
}
/**
 * check song id has playlist
 */
function validateDuplicatedSong(songId, playList) {
  for (var i = 0; i < playList.length; i++) {
    if (playList[i].song_id.equals(songId)) {
      return false;
    }
  }
  return true;
}
