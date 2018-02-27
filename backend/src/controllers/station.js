/* eslint-disable */
import { ObjectId } from 'mongodb';
import deleteDiacriticMarks from 'khong-dau';
import getSongDetails from './song';
import * as players from '../players';
import * as stationModels from '../models/station';
import * as userControllers from '../controllers/user';
import * as userModels from '../models/user';
import { Error } from 'mongoose';
import slice from 'lodash/slice';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import station from '../routes/station';
import user from '../routes/user';

const MAX_SONG_UNREGISTED_USER_CAN_ADD = 3;
const POINTS_FOR_FIRST_SONG = 2;
const POINTS_FOR_NEXT_SONG = 1;
const MINIMUM_DURATION = 60;
/**
 *
 * @param {string} stationName
 * @param {string} userId
 * @param {boolean} isPrivate - If false then station is public, if true then station is private
 */
export const addStation = async (stationName, userId, isPrivate, anonymouseClientToken = null) => {
  const currentStationName = stationName.trim().toString();
  if (!currentStationName) {
    throw new Error('The station name can not be empty!');
  } else {
    try {
      // if (isNaN(currentStationName) == false)
      //   throw new Error('The station name can not be a number!');
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

export const updateStationOwner = async (stationName, userId) => {
  const currentStationName = stationName.trim().toString();
  if(currentStationName) {
    throw new Error('The station name can not be empty!');
  } else {
    try {
      const availableStation = await stationModels.getStationByName(currentStationName);
      if(availableStation) {
        const updatedStation = await stationModels.updateStationOwner(availableStation.station_id, userId);
        return updatedStation;
      } else {
        throw new Error('The station name is not existed!');
      }
    } catch (err) {
      throw err;
    }
  }
}

/**
 * Set station is private public/private
 *
 * @param {string} stationId
 * @param {string} userId
 * @param {boolean} value -  If false then station is public, if true then station is private
 */
export const setIsPrivateOfStation = async (stationId, userId, value) => {
  try {
    const stationsOfUser = await stationModels.getStationsByUserId(
      _safeObjectId(userId),
    );
    if (!stationsOfUser) {
      throw new Error(`User ${userId} is not owner`);
    }
    if (_isStringOfArray(stationId, stationsOfUser) === true) {
      const result = await stationModels.updateIsPrivateOfStation(
        stationId,
        userId,
        value,
      );
      return result;
    }
    throw new Error(`User ${userId} is not owner`);
  } catch (error) {
    throw error;
  }
};

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
};

/**
 * Get a station by id
 *
 * @param {string} stationId
 */
export const getStation = async stationId => {
  if (!stationId) {
    throw new Error(`Station id ${stationId} is not undefined!`)
  }

  const stationOfId = await stationModels.getStationById(stationId);
  if (!stationOfId) {
    throw new Error(`Station id ${stationId} is not exist!`);
  } else {
    return stationOfId.toObject();
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
    const stations = await stationModels.getStationsByUserId(_safeObjectId(userId));
    let player;
    // Can't use forEach because can't use await..
    for (let i = 0; i < stations.length; i++) {
      stations[i] = stations[i].toObject();
      player = await players.getPlayer(stations[i].station_id);
      if (player.getNowPlaying().thumbnail)
        stations[i].thumbnail = player.getNowPlaying().thumbnail;
    }
    return stations;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Add a song
 *
 * @param {string} stationId
 * @param {string} songUrl
 * @param {string} userId
 */
export const addSong = async (stationId, songUrl, userId, title, thumbnail, duration, contentMessage) => {
  let station;
  if (!userId) {
    throw new Error(`You need to login to use this feature.`);
  }
  try {
    station = await stationModels.getStationById(stationId);
  } catch (err) {
    throw err;
  }
  if (!station) {
    throw new Error(`Station id ${stationId} is not exist!`);
  }
  // Disable getSongDetail in server side to improve performance
  // const songDetail = await getSongDetails(songUrl);
  // if (!songDetail) {
  //   throw new Error('Song url is incorrect!');
  // }

  try {
    const song = {
      song_id: new Date().getTime(),
      is_played: false,
      url: songUrl,
      title: title,
      thumbnail: thumbnail,
      duration: duration,
      creator: _safeObjectId(userId),
      created_date: new Date().getTime(),
      message: {
        content: contentMessage,
      }
    };
    await stationModels.addSong(stationId, song);
    const playlist = await getAvailableListSong(stationId);
    players.updatePlaylist(stationId);
    return playlist;
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
export const setPlayedSongs = async (stationId, songIds, isSkipped = false) => {
  try {
    const currentPlaylist = await getListSong(stationId);
    if (currentPlaylist) {
      for (let i = 0; i < songIds.length; i++) {
        for (let j = 0; j < currentPlaylist.length; j++) {
          if (currentPlaylist[j].song_id === songIds[i]) {
            currentPlaylist[j].is_played = true;
            currentPlaylist[j].is_skipped = isSkipped;
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
 * Rules:
 * - Order by created_date
 * - Only return unique url with the info of first creator
 * - Return top {limit} songs
 *
 * @param {string} stationId
 * @param {limit} limit
 */
export const getListSongHistory = async (stationId, limit) => {
  try {
    const listSong = await stationModels.getPlaylistOfStation(stationId);
    const history = filter(listSong, ['is_played', true]);
    const orderedSongs = orderBy(history, ['created_date'], ['desc']);
    const uniqueHistory = uniqBy(orderedSongs, 'url');
    const limitHistory = slice(uniqueHistory, 0, limit);
    return limitHistory;
  } catch (error) {
    throw error;
  }
};

/**
 * The func
 *
 * @param {string} stationId
 */
export const getAvailableListSong = async stationId => {
  try {
    const listSong = await stationModels.getPlaylistOfStation(stationId);
    const playlist = filter(listSong, ['is_played', false]);
    return playlist;
  } catch (error) {
    throw error;
  }
};

/**
 * Get list all infor song of station
 *
 * @param {string} stationId
 */
export const getListSong = async stationId => {
  try {
    const playList = await stationModels.getPlaylistOfStation(stationId);
    return playList;
  } catch (err) {
    throw err;
  }
};

/**
 * - Check :
 * - If user id has upvote then remove user in upvote
 * - If user id have not upvote the add user in upvote
 * - If user id has down vote :
 *  + if user down vote then remove user in down vote
 *
 * @param {string} stationId
 * @param {string} songId
 * @param {string} userId
 */
export const upVote = async (stationId, songId, userId) => {
  try {
    userId = _safeObjectId(userId);
    if (userId === null) {
      throw new Error({
        song: currentSong,
        message: 'User need login.',
      });
    }
    const currentSong = (await stationModels.getAsongInStation(
      stationId,
      songId,
    ))[0];
    if (currentSong.creator.equals(userId)) {
      throw new Error({
        song: currentSong,
        message: "Can't upvote your own song.",
      });
    }
    const upVoteArray = currentSong.up_vote;
    const downVoteArray = currentSong.down_vote;
    let userAddedPoints = 0;

    upVoteArray.forEach(votedUserId => {
      if (votedUserId.equals(userId)) {
        userAddedPoints = -1;
        upVoteArray.remove(userId);
      }
    });
    downVoteArray.forEach(votedUserId => {
      if (votedUserId.equals(userId)) {
        userAddedPoints = 2;
        downVoteArray.remove(userId);
        upVoteArray.push(userId);
      }
    });
    if (userAddedPoints == 0) {
      userAddedPoints = 1;
      upVoteArray.push(userId);
    }
    await stationModels.updateVotes(
      stationId,
      songId,
      upVoteArray,
      downVoteArray,
    );
    // TODO: update votes of users in the station
    /*
    // Update user points when up vote
    stationModels.increaseUserPoints(
      stationId,
      currentSong.creator,
      userAddedPoints,
    );
    */
    const playList = await getAvailableListSong(stationId);
    return playList;
  } catch (err) {
    console.log(err);
    throw new Error({ song: null, message: "Can't upvote song." });
  }
};

/**
 *- Check :
 * - If user id has down vote then remove user in downvote
 * - If user id have not down vote the add user in downvote
 * - If user id has upvote the remove user in upvote and add user in down vote
 *
 * @param {string} stationId
 * @param {string} songId
 * @param {string} userId
 */
export const downVote = async (stationId, songId, userId) => {
  try {
    userId = _safeObjectId(userId);
    if (userId === null) {
      throw new Error({
        song: currentSong,
        message: 'User need login.',
      });
    }
    const currentSong = (await stationModels.getAsongInStation(
      stationId,
      songId,
    ))[0];
    const upVoteArray = currentSong.up_vote;
    const downVoteArray = currentSong.down_vote;
    let userAddedPoints = 0;

    downVoteArray.forEach(votedUserId => {
      if (votedUserId.equals(userId)) {
        userAddedPoints = 1;
        downVoteArray.remove(userId);
      }
    });
    upVoteArray.forEach(votedUserId => {
      if (votedUserId.equals(userId)) {
        userAddedPoints = -2;
        upVoteArray.remove(userId);
        downVoteArray.push(userId);
      }
    });
    if (userAddedPoints == 0) {
      userAddedPoints = -1;
      downVoteArray.push(userId);
    }
    // Update user points when down vote
    await stationModels.updateVotes(
      stationId,
      songId,
      upVoteArray,
      downVoteArray,
    );
    /*
    // TODO: update votes of users in the station
    stationModels.increaseUserPoints(
      stationId,
      currentSong.creator,
      userAddedPoints,
    );
    */
    const playList = await getAvailableListSong(stationId);
    return playList;
  } catch (err) {
    console.log(err);
    throw new Error({ song: null, message: "Can't upvote song." });
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
    const stations = await stationModels.getStationHasSongUserAdded(userId);
    let player;
    // Can't use forEach because can't use await..
    for (let i = 0; i < stations.length; i++) {
      player = await players.getPlayer(stations[i].station_id);
      if (player.getNowPlaying().thumbnail)
        stations[i].thumbnail = player.getNowPlaying().thumbnail;
    }
    return stations;
  } catch (error) {
    throw error;
  }
};

export const setSkippedSong = async (stationId, songId) => {
  // TODO: set the song to skipped and update the song to played
};

// When user join station
export const joinStation = async (stationId, userId) => {
  userId = _safeObjectId(userId);
  await stationModels.joinStation(stationId, userId);
  // await stationModels.joinStation(stationId, userId);
}

export const addCreatorPoints = async (stationId, songId) => {
  const song = (await stationModels.getAsongInStation(stationId, songId))[0];
  let receivedPoints = 0;
  // TODO: change hard number to const
  if (song.is_skipped) {
    receivedPoints = receivedPoints - 1;
  } else if (song.duration > MINIMUM_DURATION) {
    if (stationModels.isFirstAddedSong(stationId, song.song_id, song.url)) {
      receivedPoints = receivedPoints + POINTS_FOR_FIRST_SONG;
    } else {
      receivedPoints = receivedPoints + POINTS_FOR_NEXT_SONG;
    }
  }
  receivedPoints = receivedPoints + song.up_vote.length - song.down_vote.length;
  if (receivedPoints !== 0) {
    stationModels.increaseUserPoints(stationId, song.creator, receivedPoints);
    return stationModels.getAllStationScores(stationId);
  }
  return null;
}

export const getStationScores = async stationId => {
  return stationModels.getAllStationScores(stationId);
}


// Covert string to ObjectId
const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export const countSongAddByUserId = async (userId, station_id) => {
  try {
    let counter = 0;
    const station = await stationModels.getStationById(station_id);
    if (station) {
      forEach(song in station.playlist);
      if (song.creator === userId) counter++;
      return { station_name: station.station_name };
    }
    return new Error('Station is not exist.');
  } catch (err) {
    throw err;
  }
};

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
