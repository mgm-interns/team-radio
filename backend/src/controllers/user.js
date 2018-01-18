/* eslint-disable */
import * as userModels from '../models/user';
import * as stationModels from '../models/station';
import jwt from 'jsonwebtoken';
import deleteDiacriticMarks from "khong-dau";
import user from '../routes/user';
import { throws } from 'assert';
import { Error } from 'mongoose';
// import bhs from 'nodemailer-express-handlebars';
// import nodemailer from 'nodemailer'
// import * as stationModels from "../models/station";

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

export const getUserById = async userId => {
  try {
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};

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

export const createUser = async (email, password, name) => {
  try {
    let user = await new userModels({
      email: email,
      name: name,
      is_password: true,
      favourited_songs: []
    });

    user.password = user.generateHash(password)
    await user.save();
    const username = await _createUsername(name);
    await userModels.setUsername(email, username);

    user = await userModels.getUserByEmail(email);
    return user;
  } catch (err) {
    throw err;
  }
};

export const getUserProfile = async username => {
  try {
    return await userModels.getUserByUsername(username);
  } catch (err) {
    throw err;
  }
};

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

export const setCover = async (userId, cover_url) => {
  try {
    await userModels.setCover(userId, cover_url);
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};

export const setUsername = async (email, username) => {
  try {
    const newUsername = await _createUsername(username);
    await userModels.setUsername(email, newUsername);
    return await userModels.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
};

export const setPassword = async (email, password) => {
  try {
    await userModels.setPassword(email, password);
    return await userModels.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
};

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

    if (firstname && user.firstname === "") point += 5;
    if (lastname && user.lastname === "") point += 5;
    if (country && user.country === "") point += 5;
    if (city && user.city === "") point += 5;
    if (bio && user.bio === "") point += 5;

    await userModels.setUserInformation(userId, data);
    await _increaseReputation(user.email, point)
    return await userModels.getUserById(userId);
  } catch (err) {
    throw err;
  }
};

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
 * 
 * @param {string} songId 
 * @param {string} userId   -- > user id  : who is favourite song
 * @param {string} stationId  -- > station id of station has song
 * @param {string} songUrl  --> url of song which is favourite
 */
export const addFavouriteSong = async (songId, userId, stationId, songUrl) => {
  try {
    const songFavourited = await userModels.getSongInFavouriteds(userId, songUrl);

    if (songFavourited.length === 0) {
      const songInStation = (await stationModels.getAsongInStation(
        stationId,
        songId
      ))[0];
      console.log("songInStation : " + " --> " + songInStation);

      await userModels.addFavouritedSongs(userId, songInStation);
      return {
        message: "Favourite successful"
      }
    } else {
      console.log("delete : ");
      await userModels.deleteAsongInFavouritedSongs(userId, songUrl);
      return {
        message: "Unfavourite successful"
      }
    }

  } catch (error) {
    console.log(error);

  }
}

export const getFavouritedSongs =async (userId) =>{
   try {
     const favouritedSongs = await userModels.getFavouritedSongs(userId);
     return favouritedSongs;
   } catch (error) {
     throw new Error("Can't get favourited songs");
   }
}

async function _increaseReputation(email, point) {
  const user = await userModels.getUserByEmail(email);
  await userModels.updateReputation(email, user.reputation + point)
}

function _stringToId(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

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