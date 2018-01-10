/* eslint-disable */
import mongoose from 'mongoose';
import { type } from 'os';

const stationSchema = mongoose.Schema({
  station_name: { type: String, require: true, },
  station_id: { type: String, require: true, },
  is_private: { type: Boolean, default: false },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null, },
  starting_time: { type: Number, default: 0, },
  playlist:
    {
      type: [
        {
          song_id: { type: Number, require: true, },
          is_played: { type: Boolean, },
          url: { type: String, required: true, },
          title: { type: String, },
          thumbnail: { type: String, },
          duration: { type: Number, min: 0, },
          creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
          created_date: { type: Number, default: true, },
          up_vote: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
          ],
          down_vote: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
          ],
        },
      ],
      default: []
    },
  created_date: { type: Number, default: new Date().getTime(), },
});

var Station = (module.exports = mongoose.model('Stations', stationSchema));
/**
 * Station
 */

// Add station
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
    return Station.deleteOne({ owner_id: userId, station_id: stationId });
  } catch (err) {
    throw err;
  }
};

// Get all station
module.exports.getAllAvailableStations = (limit) => {
  return Station.find({ is_private: false }, { station_name: 1, created_date: 1, station_id: 1, _id: 0 }).limit(limit);
};
// 
// Get all station
module.exports.getStationDetails = limit => {
  return Station.find()
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1 })
    .limit(limit)
    .exec();
};

// Get station by name
module.exports.getStationByName = stationNameToFind => {
  return Station.findOne({ station_name: stationNameToFind })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1 })
    .exec();
};

// Get station by url
module.exports.getStationById = idToFind => {
  return Station.findOne({ station_id: idToFind })
    .populate('playlist.creator', { id: 1, name: 1, avatar_url: 1 })
    .exec();
};

// Get station by user_id
module.exports.getStationsByUserId = userId => {
  return Station.find({ owner_id: userId });
};

// The function update a field starting_time in db
module.exports.updateTimeStartingOfStation = (stationId, valueNeedUpdate) => {
  try {
    let query = { station_id: stationId };
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
 * The function update a field isPrivate in db
 * valueNeedUpdate : false => station is public
 * valueNeedUpdate : true => station is private
 */
module.exports.updateIsPrivateOfStation = (stationId, userId, valueNeedUpdate) => {
  try {
    let query = { station_id: stationId, owner_id: userId };
    return Station.update(query, {
      $set: {
        is_private: valueNeedUpdate,
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
  let query = { station_id: stationId };
  return Station.update(query, {
    $addToSet: {
      playlist: song,
    },
  });
};

//Get a song in station
module.exports.getAsongInStation = async (stationId, songId) => {
  let query = {
    station_id: stationId,
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
    { station_id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.up_vote': valueNeedUpdate } },
  );
};

module.exports.updateValueOfDownvote = (stationId, songId, valueNeedUpdate) => {
  //let query = { id: stationId };
  return Station.update(
    { station_id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.down_vote': valueNeedUpdate } },
  );
};
/**
 * Playlist (songs)
 */

// The function update a field playlist in db
module.exports.updatePlaylistOfStation = (stationId, valueNeedUpdate) => {
  let query = { station_id: stationId };
  return Station.update(query, {
    $set: {
      playlist: valueNeedUpdate,
    },
  });
};

//get playlist of station
module.exports.getPlaylistOfStation = async stationId => {
  let query = { station_id: stationId };
  const station = await Station.findOne(query, { playlist: true, _id: false })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1 });
  return station.playlist;
};

// Get list song by User ID
module.exports.getLisSongByUserId = (stationId, userId) => {
  // TODO :
  return Station.find({ station_id: stationId }, {
    playlist: {
      creator: userId
    }
  });
};

// module.exports.getListSongHistory = async stationId => {
//   // TODO : 


//   const station = await Station.aggregate(
//     { $match: { station_id: 'bac-test' } },
//     { $unwind: '$playlist' },
//     { $match: { 'playlist.is_played': { $eq: false } } },
//     { $group: { _id: '$_id', playlist: { $push: '$playlist' } } })
//   //.populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1 });

//   console.log('station : ' + JSON.stringify(station));
//   return station[0].playlist;
// }

