/* eslint-disable */
import mongoose from 'mongoose';
import { type } from 'os';

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
  playlist:
    {
      type: [
        {
          song_id: {
            type: Number,
            require: true,
          },
          is_played: {
            type: Boolean,
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
          duration: {
            type: Number,
            min: 0,
          },
          creator_id: {
            type: mongoose.Schema.Types.ObjectId,
          },
          up_vote: [
            {
              type: mongoose.Schema.Types.ObjectId, // userID
            }
          ],
          down_vote: [
            {
              type: mongoose.Schema.Types.ObjectId, // userID
            }
          ],
          created_day: {
            type: Number,
            default: new Date().getTime(),
          },
        },
      ],
      default: []
    },
  created_day: {
    type: Number,
    default: new Date().getTime(),
  },
});

var Station = (module.exports = mongoose.model('Stations', stationSchema));
/**
 * Station
 */

// add station
module.exports.addStation = station => {
  try {
    return Station.create(station);
  } catch (err) {
    console.log('err : ' + err);
  }
};
// Remove station
module.exports.deleteStation = (stationId, userId) => {
  try {
    return Station.deleteOne({ owner_id: userId, id: stationId });
  } catch (err) {
    throw err;
  }

}

// get all station
module.exports.getStations = (limit) => {
  return Station.find({}, { station_name: 1, created_day: 1, id: 1, _id: 0 }).limit(limit);
};
// 
// get all station
module.exports.getStationDetails = (limit) => {
  return Station.find().limit(limit);
};

// get station from name
module.exports.getStationByName = stationNameToFind => {
  return Station.findOne({ station_name: stationNameToFind });
};

// get station from url
module.exports.getStationById = idToFind => {
  return Station.findOne({ id: idToFind });
};

// The function update a field in db
module.exports.updateTimeStartingOfStation = (stationId, valueNeedUpdate) => {
  try {
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

/**
 * A song
 */

// add song to playlist of station
module.exports.addSong = (stationId, song) => {
  let query = { id: stationId };
  return Station.update(query, {
    $addToSet: {
      playlist: song,
    },
  });
};

//Get a song in station
module.exports.getAsongInStation = async (stationId, songId) => {
  let query = {
    id: stationId,
  };
  return (await Station.findOne(query, {
    playlist: {
      $elemMatch: {
        song_id: songId,
      },
    },
  })).playlist;
};
// Update a field of up vote in a song
module.exports.updateValueOfUpvote = (stationId, songId, valueNeedUpdate) => {
  //let query = { id: stationId };
  return Station.update(
    { id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.up_vote': valueNeedUpdate } },
  );
};

module.exports.updateValueOfDownvote = (stationId, songId, valueNeedUpdate) => {
  //let query = { id: stationId };
  return Station.update(
    { id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.down_vote': valueNeedUpdate } },
  );
};
/**
 * Playlist (songs)
 */

// The function update a field playlist in db
module.exports.updatePlaylistOfStation = (stationId, valueNeedUpdate) => {
  let query = { id: stationId };
  return Station.update(query, {
    $set: {
      playlist: valueNeedUpdate,
    },
  });
};

//get playlist of station
module.exports.getPlaylistOfStation = stationId => {
  let query = { id: stationId };
  return Station.findOne(query, { playlist: true, _id: false });
};
