/* eslint-disable */
var mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;
var stationSchema = mongoose.Schema({
  station_name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  now_playing: {
    song_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    description: {},
    started_time: {
      type: Number,
      require: true,
    },
    default: '',
  },
  playlist: [
    {
      song_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        //  ref : "songs"
      },
      visible: {
        type: Boolean,
        default: true,
      },
      description: {},
      creator_id: {
        type: String,
      },
      up_vote: [
        String, // userID
      ],
      down_vote: [
        String,
        // userID
      ],
      created_day: {
        type: Number,
        default: new Date().getTime(),
      },
    },
  ],
  created_day: {
    type: Number,
    default: new Date().getTime(),
  },
});

var Station = (module.exports = mongoose.model('Stations', stationSchema));
// add station
module.exports.addStation = function(station, callback) {
  console.log('-- ' + station);
  Station.create(station, callback);
};
// get all station
module.exports.getStations = function(callback, limit) {
  Station.find(callback).limit(limit);
};
// get station from name
module.exports.getStationByName = function(stationNameToFind, callback) {
  Station.findOne({ station_name: stationNameToFind }, callback);
};
// get station from url
module.exports.getStationByUrl = function(urlToFind, callback) {
  Station.findOne({ url: urlToFind }, callback);
};
// add song to playlist of station
module.exports.addSong = function(stationName, song, callback) {
  var query = { station_name: stationName };
  Station.update(
    query,
    {
      $addToSet: {
        playlist: song,
      },
    },
    callback,
  );
};
// get station by station url
module.exports.getStationByUrl = function(stationUrlToFind, callback) {
  Station.findOne({ stationUrl: stationUrlToFind }, callback);
};
//get playlist of station
module.exports.getPlaylistOfStation = function(stationName, callback) {
  var query = { station_name: stationName };
  Station.findOne(query, { playlist: true, _id: false }, callback);
};
