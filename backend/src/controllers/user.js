/* eslint-disable */
import userModels from '../models/user';
import * as stationModels from '../models/station';
import jwt from 'jsonwebtoken';
import deleteDiacriticMarks from "khong-dau";
import { ObjectId } from 'mongodb';
import * as stationController from './station';
import user from '../routes/user';
import { throws } from 'assert';
import { Error } from 'mongoose';
// import * as stationModels from "../models/station";

export const ADD_FAVOURITE_SUCCESS = 1000;
export const UN_FAVOURITE_SUCCESS = 1001;
export const UN_FAVOURITE_SUCCESS_PROFILE = 1002;

export const isExistUserHandler = async email => {
  try {
    let alreadyUser = await userModels.getUserByEmail(email);

    //if email is already sign up
    if (alreadyUser) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param userId
 * @returns {Promise<*>}
 */
export const getUserById = async (userId) => {
  try {
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param email
 * @param googleId
 * @param facebookId
 * @param avatar_url
 * @param name
 * @returns {Promise<*>}
 */
export const createUserWithSocialAccount = async (email, googleId = null, facebookId = null, avatar_url = null, name) => {
  try {
    let user = await userModels.getUserByEmail(email);
    if (user) {
      if (googleId)
        await userModels.setGoogleId(email, googleId);
      if (facebookId)
        await userModels.setFacebookId(email, facebookId);
      if (avatar_url && !user.avatar_url) {
        await userModels.setAvatarUrl(email, avatar_url);
        await _increaseReputation(email, 20)
      }
    } else {
      let user = await new userModels({
        email: email,
        google_id: googleId,
        facebook_id: facebookId,
        name: name,
        is_password: false,
        favourited_songs: []
      });
      await user.save();
      const username = await _createUsername(name);
      await userModels.setUsername(email, username);
      if (avatar_url) {
        await userModels.setAvatarUrl(email, avatar_url);
        await _increaseReputation(email, 20)
      }
    }
    user = await userModels.getUserByEmail(email);
    return user;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param email
 * @param password
 * @param name
 * @returns {Promise<*>}
 */

export const createUser = async (email, password, name, username) => {
  try {
    let usernameAutoGenerate;
    let user = await new userModels({
      email: email,
      name: name,
      is_password: true,
      favourited_songs: []
    });

    const alreadyUser = await userModels.getUserByUsername(username);
    if (username && !alreadyUser) {
      usernameAutoGenerate = username
    } else {
      usernameAutoGenerate = await _createUsername(name);
    }

    user.password = user.generateHash(password);
    user.username = usernameAutoGenerate;

    await user.save();

    user = await userModels.getUserByEmail(email);
    return user;
  } catch (err) {
    throw err;
  }
};

export const isExistUsername = async (username) => {
  try {
    const user = await userModels.getUserByUsername(username);
    if (user) return true;
    return false
  } catch (err) {
    throw err
  }
}
/**
 *
 * @param username
 * @returns {Promise<*>}
 */
export const getUserProfile = async username => {
  try {
    return await userModels.getUserByUsername(username);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param userId
 * @param avatar_url
 * @returns {Promise<*>}
 */
export const setAvatar = async (userId, avatar_url) => {
  try {
    const user = await userModels.getUserById(userId);
    if (!user.avatar_url)
      await _increaseReputation(user.email, 20)
    await userModels.setAvatar(userId, avatar_url);
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param userId
 * @param cover_url
 * @returns {Promise<*>}
 */
export const setCover = async (userId, cover_url) => {
  try {
    await userModels.setCover(userId, cover_url);
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param email
 * @param username
 * @returns {Promise<*>}
 */
export const setUsername = async (email, username) => {
  try {
    const newUsername = await _createUsername(username);
    await userModels.setUsername(email, newUsername);
    return await userModels.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
export const setPassword = async (email, password) => {
  try {
    await userModels.setPassword(email, password);
    return await userModels.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param userId
 * @param name
 * @param firstname
 * @param lastname
 * @param bio
 * @param city
 * @param country
 * @returns {Promise<*>}
 */
export const setUserInformation = async (userId, name, firstname, lastname, bio, city, country) => {
  try {
    let data = {}, point = 0;
    const user = await userModels.getUserById(userId);
    if (name) data.name = name;
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (country) data.country = country;
    if (city) data.city = city;
    if (bio) data.bio = bio;

    if (firstname && user.firstname === "") point += 2;
    if (lastname && user.lastname === "") point += 2;
    if (country && user.country === "") point += 2;
    if (city && user.city === "") point += 2;
    if (bio && user.bio === "") point += 2;

    await userModels.setUserInformation(userId, data);
    await _increaseReputation(user.email, point)
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param userId
 * @param token
 * @param superSecret
 * @returns {Promise<boolean>}
 */
export const isVerifidedToken = async (userId, token, superSecret) => {
  try {
    let result = false;
    if (token) {
      jwt.verify(token, superSecret, (err, decoded) => {
        if (!err && decoded.userId === userId) result = true;
      });
    }
    return result;
  } catch (err) {
    throw err;
  }
};
/**
 * The function set favourite song
 * @param {string} songId
 * @param {string} userId   -- > user id  : who is favourite song
 * @param {string} stationId  -- > station id of station has song
 * @param {string} songUrl  --> url of song which is favourite
 * 
 * Case 1 : Favourite on station
 * - Use 4 params ( songId, userId, songUrl, stationId )
 * - Check : If not favourite then add song favourite return ADD_FAVOURITE_SUCCESS
 *           If favourited then remove favorite return UN_FAVOURITE_SUCCESS
 * Case 2 : Unfavourite on profile   return UN_FAVOURITE_SUCCESS_PROFILE
 *   
 */
export const addFavouriteSong = async (songId, userId, songUrl, stationId = null) => {
  try {
    const songFavourited = await userModels.getSongInFavouriteds(userId, songUrl);
    if (songFavourited.length === 0) {
      const songInStation = (await stationModels.getAsongInStation(
        stationId,
        songId
      ))[0];
      await userModels.addFavouritedSongs(userId, songInStation);
      return ADD_FAVOURITE_SUCCESS;
    } else {
      await userModels.deleteAsongInFavouritedSongs(userId, songUrl);
      if (stationId) {
        return UN_FAVOURITE_SUCCESS;
      } else {
        return UN_FAVOURITE_SUCCESS_PROFILE;
      }

    }
  } catch (error) {
    throw error;
  }
}
/**
 *
 * @param userId
 * @param station_id
 * @returns {Promise<void>}
 */
export const updateHistory = async (userId, station_id) => {
  try {
    const option = { history: 1, _id: 0 }
    const user = await userModels.getUserById(userId, option)
    const station = await stationModels.getStationById(station_id)




    let history = user.history
    if (history.length && (history.indexOf(_safeObjectId(station_id)) !== -1))
      history.remove(station_id)
    history.push(station_id)
    await userModels.updateHistory(userId, history)
    history = await userModels.getUserById(userId, option)
  } catch (err) {
    throw err
  }
}
/**
 *
 * @param userId
 * @param limited
 * @returns {Promise<Array>}
 */
export const getHistory = async (userId, limited) => {
  try {
    const option = { history: 1, _id: 0 };
    const user = await userModels.getUserById(userId, option);
    let history = user.history;
    let historyDetail = [];

    forEach(station_id in history);
    historyDetail.push(stationController.countSongAddByUserId(userId, station_id));

    return historyDetail
  } catch (err) {
    throw err
  }
}
/**
 * The function get info favourited songs
 * @param {string} userId
 */
export const getFavouritedSongs = async (userId) => {
  try {
    const favouritedSongs = await userModels.getFavouritedSongs(userId);
    return favouritedSongs;
  } catch (error) {
    throw new Error("Can't get favourited songs");
  }
}

export const getallstation = async () => {
  const user = stationModels.getAllAvailableStations();

  return user;
}

// This is private function
/**
 *
 * @param email
 * @param point
 * @returns {Promise<void>}
 * @private
 */
async function _increaseReputation(email, point) {
  const user = await userModels.getUserByEmail(email);
  await userModels.updateReputation(email, user.reputation + point)
}
/**
 *
 * @param str
 * @returns {string}
 * @private
 */
function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
/**
 *
 * @param username
 * @returns {Promise<string>}
 * @private
 */
async function _createUsername(username) {
  const id = _stringToId(deleteDiacriticMarks(username));
  let currentId = id;
  let i = 1;
  let user = await userModels.getUserByUsername(currentId);
  while (user) {
    i += 1;
    currentId = id + i;
    user = await userModels.getUserByUsername(currentId);
  }
  return currentId;
}
const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

