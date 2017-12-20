var mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;
var stationSchema = mongoose.Schema({
  stationName: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  owner: {
    type: String,
    default: 'unknow',
  },
  playlist: [
    {
      songId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
      },
      addId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      upVote: [
        String, // userID
      ],
      downVote: [
        String,
        // userID
      ],
      create_day: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  create_day: {
    type: Date,
    default: Date.now,
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
  Station.findOne({ stationName: stationNameToFind }, callback);
};
