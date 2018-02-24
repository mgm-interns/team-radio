import mongoose from 'mongoose';
import config from '../config/index';

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
});

var ScoreLog = (module.exports = mongoose.model('ScoreLog', ScoreLogSchema));
