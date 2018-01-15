/* eslint-disable camelcase */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { ObjectId } from 'mongodb';

const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email can not be empty'],
    unique: true,
  },
  password: {
    type: String,
  },
  is_password: {
    type: Boolean,
  },
  name: {
    type: String,
    default: '',
  },
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    unique: true,
  },
  avatar_url: {
    type: String,
    default: null,
  },
  cover_url: {
    type: String,
    default: null,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: 'Newbie',
    enum: ['Newbie'],
  },
  facebook_id: {
    type: String,
  },
  google_id: {
    type: String,
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

// create the model for users and expose it to our app

var user = (module.exports = mongoose.model('users', userSchema));

module.exports.getUserByEmail = async email =>
  user.findOne({ email: email }, { password: 0 });

module.exports.getUserByUsername = async username =>
  user.findOne({ username: username }, { password: 0 });

module.exports.getUserById = async userId =>
  user.findOne({ _id: _safeObjectId(userId) }, { password: 0 });

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

module.exports.updateReputation = async (userId, point) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { reputation: point },
    { multi: true },
  );

module.exports.setPassword = async (email, password) =>
  user.update(
    { email: email },
    { password: password, is_password: true },
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
