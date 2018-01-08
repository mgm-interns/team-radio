/* eslint-disable */
import { ObjectId } from 'mongodb';
import * as songController from './song';
import * as players from '../players';
import * as stationModels from './../models/station';

const MAX_SONG_UNREGISTED_USER_CAN_ADD = 3;

export const addStation = async (stationName, userId) => {
  let currentstationName = stationName.trim();
  if (!currentstationName) {
    throw new Error('The station name can not be empty!');
  } else {
    try {
      const availableStation = await stationModels.getStationByName(
        currentstationName,
      );
      if (!availableStation) {
        const stationId = await _createStationId(currentstationName);
        // or var ObjectId = require('mongodb').ObjectId if node version < 6
        const currentStation = await stationModels.addStation({
          station_name: currentstationName,
          id: stationId,
          playlist: [],
          owner_id: _safeObjectId(userId),
        });
        return currentStation;
      }
      throw new Error('The station name is already exist!');
    } catch (err) {
      throw err;
    }
  }
};

export const deleteStation = async (stationId, userId) => {
  try {
    const resolve = await stationModels.deleteStation(stationId, userId);
    return resolve;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// get a statio by id
export const getStation = async stationId => {
  const station = await stationModels.getStationById(stationId);
  if (!station) {
    throw new Error(`Station id ${stationId} is not exist!`);
  } else {
    return station;
  }
};

// get list station by user_id
export const getStationsByUserId = async userId => {
  try {
    const stations = stationModels.getStationsByUserId(_safeObjectId(userId));
    return stations;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Add a song of station
export const addSong = async (stationId, songUrl, userId = null) => {
  let station;
  try {
    station = await stationModels.getStationById(stationId);
  } catch (err) {
    throw err;
  }

  if (!station) {
    throw new Error(`Station id ${stationId} is not exist!`);
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
    throw new Error('Song url is incorrect!');
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
      created_day : new Date().getTime(),
    };
    await stationModels.addSong(stationId, song);
    station = await stationModels.getStationById(stationId);
    players.updatePlaylist(stationId);
    return station.playlist;
    // return Promise.resolve(station.playlist);
  } catch (err) {
    console.log('Error add song : ' + err);
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
/**
 * Upvote
 * userId : String
*/
export const upVote = async (stationId, songId, userId) => {
  const currentSong = (await stationModels.getAsongInStation(
    stationId,
    songId,
  ))[0];
  const upVoteArray = currentSong.up_vote;
  const downVoteArray = currentSong.down_vote;
  try {
    if (upVoteArray.length > 0) {
      for (let i = 0; i < upVoteArray.length; i++) {

        if (upVoteArray[i].toString() === userId) {

          upVoteArray.remove(_safeObjectId(userId));
          await stationModels.updateValueOfUpvote(
            stationId,
            songId,
            upVoteArray,
          );
          const playList = await getListSong(stationId);
          return playList;
        }
      }
      if (downVoteArray.length > 0) {
        for (let i = 0; i < downVoteArray.length; i++) {
          if (downVoteArray[i].toString() === userId) {
            downVoteArray.remove(_safeObjectId(userId));
            upVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);

            const playList = await getListSong(stationId);
            return playList;
          }
        }
      }
      upVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
      const playList = await getListSong(stationId);
      return playList;
    } else {
      if (downVoteArray.length > 0) {
        for (let i = 0; i < downVoteArray.length; i++) {
          if (downVoteArray[i].toString() === userId) {
            downVoteArray.remove(_safeObjectId(userId));
            upVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await getListSong(stationId);
            return playList;
          }
        }
      }
      upVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
      const playList = await getListSong(stationId);
      return playList;
    }
    const playList = await getListSong(stationId);
    return playList
  } catch (err) {
    console.log(err);
    throw new Error("Can not vote song !");
  }
};
/**
 * DownVote
 * userId : String
*/
export const downVote = async (stationId, songId, userId) => {
  const currentSong = (await stationModels.getAsongInStation(
    stationId,
    songId,
  ))[0];
  const upVoteArray = currentSong.up_vote;
  const downVoteArray = currentSong.down_vote;
  const _userId = _safeObjectId(userId);
  try {
    if (downVoteArray.length > 0) {

      for (let i = 0; i < downVoteArray.length; i++) {
        if (downVoteArray[i].toString() === userId) {
          downVoteArray.remove(_safeObjectId(userId));
          await stationModels.updateValueOfDownvote(
            stationId,
            songId,
            downVoteArray,
          );
          const playList = await getListSong(stationId);
          return playList
        }
      }
      if (upVoteArray.length > 0) {

        for (let i = 0; i < upVoteArray.length; i++) {
          if (upVoteArray[i].toString() === userId) {
            upVoteArray.remove(_safeObjectId(userId));
            downVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await getListSong(stationId);
            return playList;
          }
        }
      }
      downVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
      const playList = await getListSong(stationId);
      return playList;
    } else {
      if (upVoteArray.length > 0) {

        for (let i = 0; i < upVoteArray.length; i++) {
          if (upVoteArray[i].toString() === userId) {
            upVoteArray.remove(_safeObjectId(userId));
            downVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await getListSong(stationId);
            return playList;
          }
        }
      }
      downVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
      const playList = await getListSong(stationId);
      return playList;
    }
    const playList = await getListSong(stationId);
    return playList;
  } catch (err) {
    console.log(err);
    throw new Error("Can not vote song !");
  }

};

// Covert string to ObjectId
const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

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

