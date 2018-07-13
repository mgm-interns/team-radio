/* eslint-disable camelcase */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { ObjectId } from 'mongodb';
import { Error } from 'mongoose';

const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [false, 'Email can not be empty'],
    unique: false,
  },
  password: { type: String },
  token_reset_password: {
    type: String,
    default: '',
  },
  is_password: { type: Boolean },
  name: { type: String, default: '' },
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  bio: { type: String, default: '' },
  username: { type: String, unique: true },
  avatar_url: { type: String, default: null },
  cover_url: { type: String, default: null },
  reputation: { type: Number, default: 0 },
  level: { type: String, default: 'Newbie', enum: ['Newbie'] },
  facebook_id: { type: String },
  google_id: { type: String },
  favourited_songs: {
    type: [
      {
        song_id: { type: Number, require: true },
        url: { type: String, required: true },
        title: { type: String },
        thumbnail: { type: String },
        duration: { type: Number, min: 0 },
        creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        created_date: { type: Number, default: true },
      },
    ],
    default: [],
  },
  my_station: {
    type: [
      {
        station_id: String,
      },
    ],
  },
  history: {
    type: [
      {
        station_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Stations',
          index: true,
        },
        station_name: String,
      },
    ],
  },
});

// generation a hash
userSchema.methods.generateHash = function(pwd) {
  return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('autoIndex', true);
// create the model for users and expose it to our app

/* eslint-disable no-multi-assign */
const user = (module.exports = mongoose.model('users', userSchema));

module.exports.getUserByEmail = async email =>
  user.findOne({ email: email }, { password: 0 });

module.exports.getUserByUsername = async username =>
  user.findOne({ username: username }, { password: 0 });

module.exports.getUserById = async (userId, option) => {
  if (option) return user.findOne({ _id: _safeObjectId(userId) }, option);
  return user.findOne({ _id: _safeObjectId(userId) }, { password: 0 });
};

module.exports.getUserByFacebookId = async facebookId =>
  user.findOne({ facebook_id: facebookId }, { password: 0 });

module.exports.setFacebookId = async (email, facebookId) =>
  user.update({ email: email }, { facebook_id: facebookId }, { multi: true });

module.exports.setGoogleId = async (email, googleId) =>
  user.update({ email: email }, { google_id: googleId }, { multi: true });

module.exports.setUsername = async (email, username) =>
  user.update({ email: email }, { username: username }, { multi: true });

module.exports.setAvatarUrl = async (email, avatar_url) =>
  user.update({ email: email }, { avatar_url: avatar_url }, { multi: true });

module.exports.setUserInformation = async (userId, data) =>
  user.update({ _id: _safeObjectId(userId) }, data, { multi: true });

module.exports.updateReputation = async (email, point) =>
  user.update({ email: email }, { reputation: point }, { multi: true });

module.exports.setPassword = async (email, password) =>
  user.update(
    { email: email },
    { password: password, is_password: true, token_reset_password: '' },
    { multi: true },
  );

module.exports.setAvatar = async (userId, avatarUrl) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { avatar_url: avatarUrl },
    { multi: true },
  );
module.exports.setCover = async (userId, coverUrl) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { cover_url: coverUrl },
    { multi: true },
  );

module.exports.updateHistory = async (userId, history) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { history: history },
    { multi: true },
  );
module.exports.getHistoryDetail = async userId =>
  user
    .find({ _id: _safeObjectId(userId) }, { history: 1, _id: 0 })
    .populate('history', { station_name: 1 });
/**
 * The function update a field favourited_songs in db
 *
 * @param {string} userId
 * @param {[]} valueNeedUpdate
 */
module.exports.addFavouritedSongs = (userId, song) => {
  const query = { _id: _safeObjectId(userId) };
  return user.update(query, {
    $addToSet: {
      favourited_songs: song,
    },
  });
};

/**
 * The function delete a song of field favourited_songs in db
 *
 * @param {string} userId
 * @param {string} songUrl
 */
module.exports.deleteAsongInFavouritedSongs = (userId, songUrl) => {
  const query = { _id: _safeObjectId(userId) };
  return user.update(query, {
    $pull: {
      favourited_songs: { url: songUrl },
    },
  });
};
/**
 * The function get favourited_songs in db
 *
 * @param {string} userId
 */
module.exports.getFavouritedSongs = async userId => {
  const query = { _id: _safeObjectId(userId) };
  return (await user
    .findOne(query, { favourited_songs: true })
    .populate('favourited_songs.creator', { _id: 1, name: 1, avatar_url: 1 }))
    .favourited_songs;
};

/**
 *
 * @param {string} songUrl
 * @param {string} userId
 */
module.exports.getSongInFavouriteds = async (userId, songUrl) =>
  (await user.findOne(
    { _id: _safeObjectId(userId) },
    {
      favourited_songs: {
        $elemMatch: {
          url: songUrl,
        },
      },
    },
  )).favourited_songs;

module.exports.setTokenResetPassword = async (userId, token) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { token_reset_password: token },
    { multi: true },
  );

module.exports.getUserByResetToken = async token =>
  user.findOne({ token_reset_password: token }, { password: 0 });

module.exports.updateUserById = async (id, data) => {
  let updatedModel = { new: true };
  return user.findByIdAndUpdate(id, data, updatedModel);
};
