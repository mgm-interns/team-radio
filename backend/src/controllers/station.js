import * as songController from './song';
import * as players from '../players';
import * as stationModels from './../models/station';
import { ObjectId } from 'mongodb';

const MAX_SONG_UNREGISTED_USER_CAN_ADD = 3;

export const addStation = async (stationName, userId) => {
  if (!stationName) {
    throw new Error('The station name can not be empty!');
  } else {
    try {
      const availableStation = await stationModels.getStationByName(
        stationName,
      );
      if (!availableStation) {
        const stationId = await _createStationId(stationName);
        // or var ObjectId = require('mongodb').ObjectId if node version < 6

        const currentStation = await stationModels.addStation({
          station_name: stationName,
          id: stationId,
          owner_id: _safeObjectId(userId),
        });
        return currentStation;
      }
      throw new Error('The station name is available');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

// get a statio by id
export const getStation = async stationId => {
  const station = await stationModels.getStationById(stationId);
  if (!station) {
    throw new Error(`Station id ${stationId} is not available!`);
  } else {
    return station;
  }
};
// add a song of station

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
      if (!song.creator_id && song.is_played === false) {
        numOfSongsAddedByUnregistedUsers += 1;
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

  const songDetail = await songController.getSongDetails(songUrl);
  if (!songDetail) {
    throw new Error('The song url is not available !');
  }
  try {
    const song = {
      song_id: new Date().getTime(),
      is_played: false,
      url: songDetail.url,
      title: songDetail.title,
      thumbnail: songDetail.thumbnail,
      duration: songDetail.duration,
      creator_id: _safeObjectId(userId),
    };
    await stationModels.addSong(stationId, song);
    station = await stationModels.getStationById(stationId);
    players.updatePlaylist(stationId);
    return station.playlist;
    // return Promise.resolve(station.playlist);
  } catch (err) {
    console.log('Error of add song : ' + err);
    throw err;
  }
};

export const updateStartingTime = async (stationId, time) => {
  const available = await stationModels.updateTimeStartingOfStation(
    stationId,
    time,
  );
  return available;
};

// To stationId and set songIds from false to true
export const setPlayedSongs = async (stationId, songIds) => {
  const currentPlaylist = await getListSong(stationId);
  // console.log(currentPlaylist);
  if (currentPlaylist) {
    for (let i = 0; i < songIds.length; i++) {
      for (let j = 0; j < currentPlaylist.length; j++) {
        if (currentPlaylist[j].song_id === songIds[i]) {
          currentPlaylist[j].is_played = false;
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
  const stations = await stationModels.getStations();
  return stations;
};

export const getAllStationDetails = async () => {
  const stations = await stationModels.getStationDetails();
  return stations;
};

export const getListSong = async stationId => {
  const playList = (await stationModels.getPlaylistOfStation(stationId))
    .playlist;
  return playList;
};

export const upVote = async (stationId, songId, userId) => {
  // TO DO :
  const currentSong = (await stationModels.getAsongInStation(
    stationId,
    songId,
  ))[0];
  let upVoteArray = currentSong.up_vote;
  if (upVoteArray.length > 0) {
  } else {
    upVoteArray.push(_safeObjectId(userId));
    await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
  }
  return currentSong;
};

function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function _createStationId(stationName) {
  const id = _stringToId(stationName);
  let currentId = id;
  let i = 1;
  let station = await stationModels.getStationById(currentId);
  while (station) {
    i += 1;
    currentId = id + i;
    station = await stationModels.getStationById(currentId);
  }
  return currentId;
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
