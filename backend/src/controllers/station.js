/* eslint-disable */
import { ObjectId } from 'mongodb';
import deleteDiacriticMarks from 'khong-dau';
import getSongDetails from './song';
import * as players from '../players';
import * as stationModels from './../models/station';
import { Error } from 'mongoose';
import station from '../routes/station';

const MAX_SONG_UNREGISTED_USER_CAN_ADD = 3;
/**
 * 
 * @param {string} stationName
 * @param {string} userId 
 * @param {boolean} isPrivate - If false then station is public, if true then station is private
 */
export const addStation = async (stationName, userId, isPrivate) => {
  const currentStationName = stationName.trim();
  if (!currentStationName) {
    throw new Error('The station name can not be empty!');
  } else {
    try {
      const availableStation = await stationModels.getStationByName(
        currentStationName,
      );
      if (!availableStation) {
        const stationId = await _createStationId(currentStationName);
        // or var ObjectId = require('mongodb').ObjectId if node version < 6
        const currentStation = await stationModels.addStation({
          station_name: currentStationName,
          station_id: stationId,
          playlist: [],
          is_private: isPrivate,
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

/**
 * Set station is private public/private
 * 
 * @param {string} stationId 
 * @param {string} userId 
 * @param {boolean} value -  If false then station is public, if true then station is private
 */
export const setIsPrivateOfStation = async (stationId, userId, value) => {
  // TODO : 
  try {
    const stationsOfUser = await stationModels.getStationsByUserId(_safeObjectId(userId));
    if (!stationsOfUser) {
      throw new Error(`User ${userId} is not owner`);
    }
    if (_isStringOfArray(stationId, stationsOfUser) === true) {
      const result = await stationModels.updateIsPrivateOfStation(stationId, userId, value);
      return result;
    } else {
      throw new Error(`User ${userId} is not owner`);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {string} stationId 
 * @param {string} userId 
 */
export const deleteStation = async (stationId, userId) => {
  // TODO :
  try {
    const resolve = await stationModels.deleteStation(stationId, userId);
    return resolve;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Get a statio by id
 * 
 * @param {string} stationId 
 */
export const getStation = async stationId => {
  const station = await stationModels.getStationById(stationId);
  if (!station) {
    throw new Error(`Station id ${stationId} is not exist!`);
  } else {
    return station.toObject();
  }
};

/**
 * Get station by user id
 *  return info :
 * - station_id
 * - created_date 
 * - station_name
 * - owner_id
 * 
 * @param {string} userId 
 */
export const getStationsByUserId = async userId => {
  try {
    const stations = stationModels.getStationsByUserId(_safeObjectId(userId));
    return stations;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Add a song
 * 
 * @param {string} stationId 
 * @param {string} songUrl 
 * @param {string} userId 
 */
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
      if (!song.creator && song.is_played === false) {
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

  const songDetail = await getSongDetails(songUrl);
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
      creator: _safeObjectId(userId),
      created_date: new Date().getTime(),
    };
    await stationModels.addSong(stationId, song);
    station = await stationModels.getStationById(stationId);
    players.updatePlaylist(stationId);
    return station.playlist;
  } catch (err) {
    console.log('Error add song : ' + err);
    throw err;
  }
};
/**
 * Update time starting of station
 * 
 * @param {string} stationId 
 * @param {number} time 
 */
export const updateStartingTime = async (stationId, time) => {
  try {
    const available = await stationModels.updateTimeStartingOfStation(
      stationId,
      time,
    );
    return available;
  } catch (error) {
    throw error;
  }
};

/**
 * The song played will be set to true
 * 
 * @param {string} stationId 
 * @param {string} songIds 
 */
export const setPlayedSongs = async (stationId, songIds) => {
  try {
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
  } catch (error) {
    throw err;
  }
};

/**
 * The function get info :
 * - station_name
 * - station_id,
 * - created_date
 * - thumbnail
 * of all station
 */
export const getAllAvailableStations = async () => {
  try {
    const stations = await stationModels.getAllAvailableStations();
    let player;
    // Can't use forEach because can't use await..
    for (let i = 0; i < stations.length; i++) {
      stations[i] = stations[i].toObject();
      player = await players.getPlayer(stations[i].station_id);
      stations[i].thumbnail = player.getNowPlaying().thumbnail;
    }
    return stations;
  } catch (err) {
    throw err;
  }
};

/**
 * The function get all info of all station
 */
export const getAllStationDetails = async () => {
  const stations = await stationModels.getStationDetails();
  return stations;
};

/**
 * The function get all info of history playlist
 * 
 * @param {string} stationId 
 */
export const getListSongHistory = async stationId => {
  try {
    const listSong = await stationModels.getPlaylistOfStation(stationId);
    for (let i = 0; i < listSong.length; i++) {
      if (listSong[i].is_played === false) {
        listSong.remove(listSong[i]);
        i--;
      }
    }
    return listSong;
  } catch (error) {
    throw error;
  }
}

/**
 * The func
 * 
 * @param {string} stationId 
 */
export const getAvailableListSong = async stationId => {
  try {
    const listSong = await stationModels.getPlaylistOfStation(stationId);
    for (let i = 0; i < listSong.length; i++) {
      if (listSong[i].is_played === true) {
        listSong.remove(listSong[i]);
        i--;
      }
    }
    return listSong;
  } catch (error) {
    throw error;
  }
}

/**
 * Get list all infor song of station
 * 
 * @param {string} stationId 
 */
export const getListSong = async stationId => {
  try {
    const playList = (await stationModels.getPlaylistOfStation(stationId));
    return playList;
  } catch (err) {
    throw err;
  }

};


/**
 * @param {string} stationId 
 * @param {string} songId 
 * @param {string} userId 
 */
export const upVote = async (stationId, songId, userId) => {
  try {
    const currentSong = (await stationModels.getAsongInStation(
      stationId,
      songId,
    ))[0];
    const upVoteArray = currentSong.up_vote;
    const downVoteArray = currentSong.down_vote;
    const userAddSong = currentSong.creator.toString();
    if (userAddSong === userId) {
      throw new Error("Can't up vote your song .");
    }
    if (upVoteArray.length > 0) {
      for (let i = 0; i < upVoteArray.length; i++) {

        if (upVoteArray[i].toString() === userId) {

          upVoteArray.remove(_safeObjectId(userId));
          await stationModels.updateValueOfUpvote(
            stationId,
            songId,
            upVoteArray,
          );
          const playList = await stationModels.getPlaylistOfStation(stationId);
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

            const playList = await stationModels.getPlaylistOfStation(stationId);
            return playList;
          }
        }
      }
      upVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
      const playList = await stationModels.getPlaylistOfStation(stationId);
      return playList;
    } else {
      if (downVoteArray.length > 0) {
        for (let i = 0; i < downVoteArray.length; i++) {
          if (downVoteArray[i].toString() === userId) {
            downVoteArray.remove(_safeObjectId(userId));
            upVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await stationModels.getPlaylistOfStation(stationId);
            return playList;
          }
        }
      }
      upVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
      const playList = await stationModels.getPlaylistOfStation(stationId);
      return playList;
    }
    const playList = await stationModels.getPlaylistOfStation(stationId);
    return playList;
  } catch (err) {
    console.log(err);
    throw new Error("Can not vote song !");
  }
};

/**
 * 
 * @param {string} stationId 
 * @param {string} songId 
 * @param {string} userId 
 */
export const downVote = async (stationId, songId, userId) => {
  try {
    const currentSong = (await stationModels.getAsongInStation(
      stationId,
      songId,
    ))[0];
    const upVoteArray = currentSong.up_vote;
    const downVoteArray = currentSong.down_vote;
    const _userId = _safeObjectId(userId);
    if (downVoteArray.length > 0) {

      for (let i = 0; i < downVoteArray.length; i++) {
        if (downVoteArray[i].toString() === userId) {
          downVoteArray.remove(_safeObjectId(userId));
          await stationModels.updateValueOfDownvote(
            stationId,
            songId,
            downVoteArray,
          );
          const playList = await stationModels.getPlaylistOfStation(stationId);
          return playList;
        }
      }
      if (upVoteArray.length > 0) {

        for (let i = 0; i < upVoteArray.length; i++) {
          if (upVoteArray[i].toString() === userId) {
            upVoteArray.remove(_safeObjectId(userId));
            downVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await stationModels.getPlaylistOfStation(stationId);
            return playList;
          }
        }
      }
      downVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
      const playList = await stationModels.getPlaylistOfStation(stationId);
      return playList;
    } else {
      if (upVoteArray.length > 0) {

        for (let i = 0; i < upVoteArray.length; i++) {
          if (upVoteArray[i].toString() === userId) {
            upVoteArray.remove(_safeObjectId(userId));
            downVoteArray.push(_safeObjectId(userId));
            await stationModels.updateValueOfUpvote(stationId, songId, upVoteArray);
            await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
            const playList = await getPlaylistOfStation(stationId);
            return playList;
          }
        }
      }
      downVoteArray.push(_safeObjectId(userId));
      await stationModels.updateValueOfDownvote(stationId, songId, downVoteArray);
      const playList = await stationModels.getPlaylistOfStation(stationId);
      return playList;
    }
    const playList = await stationModels.getPlaylistOfStation(stationId);
    return playList;
  } catch (err) {
    console.log(err);
    throw new Error("Can not vote song !");
  }

};

/**
 * Get list station which user has added song
 * return infors :
 * - station_id 
 * - created_date
 * - station_name
 * - owner_id
 * 
 * @param {string} userId 
 */
export const getListStationUserAddedSong = async userId => {
  try {
    const stations = await stationModels.getAllStationLimitInfor();
    const currentStation = [];
    for (let i = 0; i < stations.length; i++) {
      const playList = (await stationModels.getStationHasSongUserAdded(stations[i].station_id, userId)).playlist;
      if (playList.length > 0) {
        currentStation.push(stations[i]);
      }
    }
    return currentStation;
  } catch (error) {
    throw error;
  }
}

export const setSkippedSong = async (stationId, songId) => {
  // TODO: set the song to skipped and update the song to played
}

// Covert string to ObjectId
const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function _createStationId(stationName) {
  let id = _stringToId(deleteDiacriticMarks(stationName));
  if (!id) {
    id = 'abcdefgyklmn';
  }
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

function _isStringOfArray(str, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].station_id === str) {
      return true;
    }
  }
  return false;
}
