/* eslint-disable */
import _ from 'lodash';
import mongoose, { Error } from 'mongoose';
import * as searchController from '../controllers/search';

const stationSchema = mongoose.Schema({
  station_name: { type: String, require: true },
  station_id: { type: String, require: true },
  is_private: { type: Boolean, default: false },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null, },
  starting_time: { type: Number, default: 0, },
  is_delete: { type: Boolean, default: false },
  playlist:
    {
      type: [
        {
          song_id: { type: Number, require: true, },
          is_played: { type: Boolean, },
          is_skipped: { type: Boolean, default: false},
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
          message: {
            content: {
              type: String
            },
            receivers: {
              type: [
                { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
              ]
            }
          }
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
  skip_by_station_owner: { type: Boolean, default: false }, // Skip rule per station
  chat:
    {
      type: [
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users',
          },
          message: { type: mongoose.Schema.Types.String, require: true, },
          created_date: { type: Number, default: new Date().getTime(), },
        }
      ],
      default: []
    }
});

// Create text index for search perform
stationSchema.index({ station_name: 'text', station_id: 'text' });

const Station = (module.exports = mongoose.model('stations', stationSchema));

searchController.attachStationData(Station);

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
 */
module.exports.deleteStation = (stationId) => {
  try {
    let query = { station_id: stationId };
    return Station.update(query, {
      $set: {
        is_delete: true,
      },
    });
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
  return Station.find({ is_private: false, is_delete: false }, { station_name: 1, created_date: 1, station_id: 1, _id: 0 }).limit(limit);
};

/**
 * Get all info station
 *
 * @param {number} limit
 */
module.exports.getStationDetails = limit => {
  return Station.find({ is_delete: false })
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
  return Station.find({ is_delete: false }, { station_id: 1, created_date: 1, station_name: 1, owner_id: 1 })
    .limit(limit)
    .exec();
};

/**
 * Get station by name
 *
 * @param {string} stationNameToFind
 */
module.exports.getStationByName = stationNameToFind => {
  return Station.findOne({ station_name: stationNameToFind, is_delete: false })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1, username: 1 })
    .exec();
};

/**
 * Get station by id
 *
 * @param {string} idToFind
 */
module.exports.getStationById = idToFind => {
  return Station.findOne({ station_id: idToFind, is_delete: false })
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
  return Station.find({ owner_id: userId, is_delete: false }, { station_id: 1, created_date: 1, station_name: 1, owner_id: 1, });
};


/**
 * The function update a field starting_time in db
 *
 * @param {string} stationId
 * @param {boolean} valueNeedUpdate
 */
module.exports.updateTimeStartingOfStation = (stationId, valueNeedUpdate) => {
  try {
    let query = { station_id: stationId, is_delete: false };
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
    let query = { station_id: stationId, owner_id: userId, is_delete: false };
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
 * Update the creator of station by station Id
 * @param stationId
 * @param userId
 */
module.exports.updateStationOwner = (stationId, userId) => {
  try {
    let query = { station_id: stationId};
    return Station.update(query, {
      $set: {
        owner_id: userId,
      },
    });
  }
  catch (err) {
    console.log("Server error when update station's creator");
  }
};

/**
 * Use to change skip rule of station
 * @param {string} stationId
 * @param {boolean} skipRule
 */
module.exports.changeSkipRuleSetting = (stationId, skipByOwner) => {
    try {
        let conditions = { station_id: stationId };
        let updates = { $set: { skip_by_station_owner: skipByOwner }, };
        Station.update(conditions, updates);
    }
    catch (err) {
        console.log('Error when update skip rule setting!' + err.message);
        throw err;
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
    is_delete: false
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
  let query = { station_id: stationId, is_delete: false };
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
 * @param {limit} limit
 */
module.exports.getPlaylistOfStation = async (stationId, limit) => {
  let query = { station_id: stationId, is_delete: false };
  const station = await Station.findOne(query, { playlist: true, _id: false })
    .populate('playlist.creator', { _id: 1, name: 1, avatar_url: 1, username: 1 })

  return station.playlist;
};

/**
 *
 * @param {string} userId
 */
module.exports.getStationHasSongUserAdded = async (userId) => {
  let stations = await Station.find({
    playlist: {
      $elemMatch: {
        creator: userId
      }
    },
    is_delete: false
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


module.exports.joinStation = async (stationId, userId) => {
  const station = await module.exports.getStationById(stationId);
  const user_points = station.user_points;
  for (let i = 0; i < user_points.length; i++) {
    if (user_points[i].user_id.equals(userId)) {
      return;
    }
  }
  return Station.update({ station_id: stationId, is_delete: false }, {
    $addToSet: {
      user_points: { user_id: userId, points: 0 },
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
        if (user_points[i].points < 0)
          user_points[i].points = 0;
        break;
      }
    }
    return Station.update({ station_id: stationId, is_delete: false }, {
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
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].song_url == songUrl) {
      return songId.equals(playlist[i].song_id) ? true : false;
    }
  }
  throw new Error('The song do not exist');
}

module.exports.getAllStationScores = async (stationId) => {
  const station = await Station.findOne({ station_id: stationId});
  if (station){
    return station.user_points;
  }
  throw new Error('The station do not exist');
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

/**
 *
 * @param stationId
 * @returns {Promise<chat|{type, default}>}
 */
module.exports.getAllChatInStation = async stationId => {
  const station = await Station
    .findOne({ station_id: stationId })
    .populate('chat.sender', { _id: 1, name: 1, avatar_url: 1, username: 1 });

  if (station){
    return station.chat;
  }
  throw new Error('The station do not exist');
};

/**
 *
 * @param stationId
 * @param user_id
 * @param message
 * @returns {Promise<*>}
 */
module.exports.addChatMessage = async (stationId, { userId, message }) => {
  const station = await Station.findOne({ station_id: stationId});

  if (station){
    return Station.update({ station_id: stationId }, {
      $push: { chat: { sender: userId,  message } }
    });
  }
  throw new Error('The station do not exist');
};
