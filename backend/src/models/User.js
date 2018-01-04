import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

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
module.exports = mongoose.model('users', userSchema);

var user;

module.exports.getUserByEmail = async email => {
  const query = { email: email };
  return user.findOne(query);
};
module.exports.getUserById = async userId => {
  const query = { _id: userId };
  return user.findOne(query);
};
