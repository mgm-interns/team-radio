/* eslint-disable */
import _ from 'lodash';
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
          // comment :{
          //   type : String
          // }
        },
      ],
      default: []
    },
  user_points:
    {
      type: [
        {
          user_id: { type: mongoose.Schema.Types.ObjectId, require: true, },
          points: { type: Number, require: true, default: 0, },
        },
      ],
      default: []
    },
  created_date: { type: Number, default: new Date().getTime(), },
});

var Station = (module.exports = mongoose.model('stations', stationSchema));

/******************** STATION **************************/

/**
 * Add station
 *
 * @param {{}} station
 */
module.exports.addStation = station => {
  try {
    return Station.create(station);
  } catch (err) {
    console.log('err : ' + err);
  }
};

/**
 * Delete station
 *
 * @param {string} stationId
 * @param {string} userId
 */
module.exports.deleteStation = (stationId, userId) => {
  try {
    return Station.deleteOne({ owner_id: userId, station_id: stationId });
  } catch (err) {
    throw err;
  }
};

/**
 * Get all station has is_private : fasle (station is public)
 * return info :
 * - station_name
 * - created_date
 * - station_id
 *
 * @param {number} limit
 */
module.exports.getAllAvailableStations = (limit) => {
  return Station.find({ is_private: false }, { station_name: 1, created_date: 1, station_id: 1, _id: 0 }).limit(limit);
};

/**
 * Get all info station
 *
 * @param {number} limit
 */
module.exports.getStationDetails = limit => {
  return Station.find()
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1, username: 1 })
    .limit(limit)
    .exec();
};

/**
 * Get info of station  :
 * - station_id
 * - created_date
 * - station_name
 * - owner_id
 *
 * @param {number} limit
 */
module.exports.getAllStationLimitInfor = limit => {
  return Station.find({}, { station_id: 1, created_date: 1, station_name: 1, owner_id: 1 })
    .limit(limit)
    .exec();
};

/**
 * Get station by name
 *
 * @param {string} stationNameToFind
 */
module.exports.getStationByName = stationNameToFind => {
  return Station.findOne({ station_name: stationNameToFind })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1, username: 1 })
    .exec();
};

/**
 * Get station by id
 *
 * @param {string} idToFind
 */
module.exports.getStationById = idToFind => {
  return Station.findOne({ station_id: idToFind })
    .populate('playlist.creator', { id: 1, name: 1, avatar_url: 1, username: 1 })
    .exec();
};

/**
 * Get station by id
 * return info :
 * - station_id
 * - created_date
 * - station_name
 * - owner_id
 *
 * @param {string} userId
 */
module.exports.getStationsByUserId = userId => {
  return Station.find({ owner_id: userId }, { station_id: 1, created_date: 1, station_name: 1, owner_id: 1 });
};


/**
 * The function update a field starting_time in db
 *
 * @param {string} stationId
 * @param {boolean} valueNeedUpdate
 */
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
 *
 *
 * @param {string} stationId
 * @param {string} userId
 * @param {boolean} valueNeedUpdate
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

/******************** A SONG**************************/

/**
 * Add a song
 *
 * @param {string} stationId
 * @param {{}} song
 */
module.exports.addSong = (stationId, song) => {
  if (song.creator){
    addUserPoints(stationId, song.creator);
  }
  let query = { station_id: stationId };
  return Station.update(query, {
    $addToSet: {
      playlist: song,
    },
  });
};

/**
 * Get a song in station
 *
 * @param {string} stationId
 * @param {string} songId
 */
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

/**
 * Update a field of upvote in a song
 *
 * @param {string} stationId
 * @param {string} songId
 * @param {[]} valueNeedUpdate
 */
module.exports.updateValueOfUpvote = (stationId, songId, valueNeedUpdate) => {
  return Station.update(
    { station_id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.up_vote': valueNeedUpdate } },
  );
};

/**
 * Update a field of down vote in a song
 *
 * @param {string} stationId
 * @param {string} songId
 * @param {[]} valueNeedUpdate
 */
module.exports.updateValueOfDownvote = (stationId, songId, valueNeedUpdate) => {
  return Station.update(
    { station_id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.down_vote': valueNeedUpdate } },
  );
};


module.exports.updateVotes = (stationId, songId, newUpVotes, newDownVotes) => {
  return Station.update(
    { station_id: stationId, 'playlist.song_id': songId },
    { $set: { 'playlist.$.up_vote': newUpVotes, 'playlist.$.down_vote': newDownVotes } },
  );
};
/*********************** Playlist (songs) ********************/

/**
 * The function update a field playlist in db
 *
 * @param {string} stationId
 * @param {[]} valueNeedUpdate
 */
module.exports.updatePlaylistOfStation = (stationId, valueNeedUpdate) => {
  let query = { station_id: stationId };
  return Station.update(query, {
    $set: {
      playlist: valueNeedUpdate,
    },
  });
};

/**
 * Get playlist of station
 *
 * @param {string} stationId
 */
module.exports.getPlaylistOfStation = async (stationId, limit) => {
  let query = { station_id: stationId };
  const station = await Station.findOne(query, { playlist: true, _id: false })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1 })
    .limit(limit);
    
  return station.playlist;
};

/**
 *
 * @param {string} stationId
 * @param {string} userId
 */
module.exports.getStationHasSongUserAdded = async (userId) => {
  let stations = await Station.find({
    playlist: {
      $elemMatch: {
        creator: userId
      }
    }
  }, { station_id: 1, created_date: 1, station_name: 1, owner_id: 1, playlist: 1 });
  const usreStations = [];
  stations.forEach(station => {
    station = station.toObject();
    station.song_count = station.playlist.length;
    delete station.playlist;
    usreStations.push(station);
  });
  return usreStations;
}

async function addUserPoints(stationId, userId) {
  const station = await module.exports.getStationById(stationId);
  const user_points = station.user_points;
  for(let i=0; i<user_points.length; i++){
    if (user_points[i].user_id.equals(userId)){
      return;
    }
  }
  return Station.update({ station_id: stationId }, {
    $addToSet: {
      user_points: {user_id: userId, points: 0},
    }
  });
}

module.exports.increaseUserPoints = async (stationId, userId, increasingPoints) => {
  if (!userId)
    throw new Error(`Can't increase points for ${userId}`);
  try {
    const station = await module.exports.getStationById(stationId);
    const user_points = station.user_points;
    for (let i = 0; i < user_points.length; i++) {
      if (user_points[i].user_id.equals(userId)) {
        user_points[i].points += increasingPoints;
      }
    }
    return Station.update({station_id: stationId}, {
      $set: {
        user_points: user_points,
      }
    });
  } catch (err) {
    throw err;
  }
}

module.exports.isFirstAddedSong = async (stationId, songId, songUrl) => {
  let playlist = await module.exports.getPlaylistOfStation(stationId);
  playlist = _.orderBy(playlist, ['created_date']);
  console.log('stationId, songId, songUrl:', stationId, songId, songUrl);

  for(let i=0; i<playlist.length; i++) {
    if (playlist[i].song_url == songUrl){
      return songId.equals(playlist[i].song_id) ? true : false;
    }
  }
}


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

