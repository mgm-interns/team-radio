import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { ObjectId } from 'mongodb';

const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email can not be empty'],
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar_url: {
    type: String,
    default:
      'http://res.cloudinary.com/vampire/image/upload/v1515458123/default_avatar.png',
  },
  reputation: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: 'Little chick',
    enum: ['Little chick'],
  },
  facebook_id: {
    type: String,
  },
  google_id: {
    type: String,
  },
});

// generation a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app

var user = (module.exports = mongoose.model('users', userSchema));

module.exports.getUserByEmail = async email => {
  const query = { email: email };
  return user.findOne(query);
};

module.exports.getUserByName = async name => {
  const query = { name: name };
  return user.findOne(query);
};

module.exports.getUserById = async userId =>
  user.findOne({ _id: _safeObjectId(userId) });

module.exports.setFacebookId = async (email, facebookId) =>
  user.update({ email: email }, { facebook_id: facebookId }, { multi: true });

module.exports.setGoogleId = async (email, googleId) =>
  user.update({ email: email }, { google_id: googleId }, { multi: true });

module.exports.setName = async (email, name) =>
  user.update({ email: email }, { name: name }, { multi: true });

module.exports.setAvatar = async (userId, avatarUrl) =>
  user.update(
    { _id: _safeObjectId(userId) },
    { avatar_url: avatarUrl },
    { multi: true },
  );
