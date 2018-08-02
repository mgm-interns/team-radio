import mongoose from 'mongoose';

const commitSchema = mongoose.Schema({
  sha: { type: String },
  commit: {
    type: {
      author: {
        type: {
          name: { type: String, require: true },
          email: { type: String, require: true },
          date: { type: Number, require: true },
        },
      },
      message: { type: String },
      verification: {
        type: {
          verified: { type: Boolean, require: true },
          reason: { type: String, require: true },
        },
      },
    },
  },
  url: { type: String, require: true },
  html_url: { type: String, require: true },
  author: {
    type: {
      login: { type: String, require: true },
      email: { type: String, require: true },
      avatar_url: { type: String, require: true },
      url: { type: String, require: true },
      html_url: { type: String, require: true },
    },
  },
  committer: {
    type: {
      login: { type: String, require: true },
      email: { type: String, require: true },
      avatar_url: { type: String, require: true },
      url: { type: String, require: true },
      html_url: { type: String, require: true },
    },
  },
});

/* eslint-disable-next-line */
const Worker = (module.exports = mongoose.model('commits', commitSchema));
