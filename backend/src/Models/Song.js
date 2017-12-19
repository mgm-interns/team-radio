var mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
	url: {type: String},
	title: {type: String},
	thumbnail: {type: String},
	owner: {type: String},
	duration: {type: Number}
});

module.exports = mongoose.model('songs',SongSchema);