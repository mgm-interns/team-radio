const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  thumbnail: { type: String },
  owner: { type: String },
  duration: { type: Number, min: 0 },
});

module.exports = mongoose.model('songs', SongSchema);
