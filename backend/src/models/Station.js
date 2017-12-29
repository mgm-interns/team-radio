/* eslint-disable */
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
//const ObjectId = mongoose.Schema.Types.ObjectId;
const stationSchema = mongoose.Schema({
  station_name: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  starting_time: {
    type: Number,
    default: 0,
  },
  playlist: [
    {
      song_id: {
        type: Number,
        require: true,
        default: new Date().getTime(),
        //  ref : "songs"
      },
      is_played: {
        type: Boolean,
        default: false,
      },
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
      owner: {
        type: String,
      },
      duration: {
        type: Number,
        min: 0,
      },
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
module.exports.addStation = station => {
  try {
    return Station.create(station);
  } catch (err) {
    console.log('err : ' + err);
  }
};
// get all station
module.exports.getStations = limit => {
  return Station.find().limit(limit);
};
// get station from name
module.exports.getStationByName = function(stationNameToFind) {
  return Station.findOne({ station_name: stationNameToFind });
};
// get station from url
module.exports.getStationById = idToFind => {
  return Station.findOne({ id: idToFind });
};
// add song to playlist of station
module.exports.addSong = function(stationId, song) {
  let query = { id: stationId };
  return Station.update(query, {
    $addToSet: {
      playlist: song,
    },
  });
};
// The function update a field playlist in db
module.exports.updatePlaylistOfStation = (stationId, valueNeedUpdate) => {
  let query = { id: stationId };
  return Station.update(query, {
    $set: {
      playlist: valueNeedUpdate,
    },
  });
};
// The function update a field in db
module.exports.updateTimeStartingOfStation = (stationId, valueNeedUpdate) => {
  try {
    console.log('valueNeedUpdate : ' + valueNeedUpdate);
    let query = { id: stationId };
    return Station.update(query, {
      $set: {
        starting_time: valueNeedUpdate,
      },
    });
  } catch (err) {
    console.log('Err updateTimeStartingOfStation models : ' + err);
  }
};
//get playlist of station
module.exports.findSongIdOfPlaylist = stationName => {
  let query = { station_name: stationName };
  return Station.find(query).toArray();
};
//get playlist of station
module.exports.getPlaylistOfStation = stationName => {
  let query = { station_name: stationName };
  return Station.findOne(query, { playlist: true, _id: false });
};
//get playlist of station by station id
module.exports.getPlaylistOfStationById = stationId => {
  let query = { id: stationId };
  return Station.findOne(query).playlist;
};
