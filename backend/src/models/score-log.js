import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import config from '../config/index';

const _safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

const ScoreLogSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  action_key: {
    type: String,
    enum: Object.values(config.action.ACTION_DEFINITIONS),
    require: true,
  },
  description: {
    type: {
      station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stations',
        index: true,
      },
      song_url: String,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
      },
    },
  },
  created_date: {
    type: Number,
    default: new Date().getTime(),
  },
});

const ScoreLog = (module.exports = mongoose.model('ScoreLog', ScoreLogSchema));

module.exports.createScoreLog = async (
  userId,
  score,
  actionKey,
  description,
) => {
  let des = {
    station_id: null,
    song_url: null,
    song_owner: null,
  };
  return ScoreLog.create(
    {
      user_id: userId,
      score: score,
      action_key: actionKey,
      description: await mapValueOfKeyInObject(des, description),
    },
    function(error, data) {
      if (error) {
        console.log(error);
      }
      return data;
    },
  );
};

const mapValueOfKeyInObject = (objA, objB) => {
  if (objB)
    Object.keys(objA).map(function(key) {
      if (objB.hasOwnProperty(key)) {
        objA[key] = objB[key];
      }
    });
  return objA;
};

module.exports.isUserJoinedStation = async (userId, stationId, actionKey) => {
  console.log(stationId);
  return ScoreLog.findOne({
    user_id: _safeObjectId(userId),
    action_key: actionKey,
    'description.station_id': stationId,
  });
};
