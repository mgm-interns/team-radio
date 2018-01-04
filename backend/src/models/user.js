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
  avatar_Url: {
    type: String,
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
  facebook_ID: {
    type: String,
  },
  google_ID: {
    type: String,
  },
  twitter_ID: {
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

// create the model for users and expose it ti our app

var user = (module.exports = mongoose.model('users', userSchema));

module.exports.getUserByEmail = async email => {
  const query = { email: email };
  return user.findOne(query);
};
module.exports.getUserById = async userId =>
  user.findOne({ _id: _safeObjectId(userId) });

module.exports.setSocialAccount = async (email, googleId, facebookId) => {
  return user.update(
    { email: email },
    { facebook_ID: facebookId, google_ID: googleId },
    { multi: true },
  );
};
