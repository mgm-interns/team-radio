import mongoose from 'mongoose';
import config from '../config/index';

const ActionDefinitionSchema = mongoose.Schema({
  action_key: {
    type: String,
    require: true,
    enum: config.common.ACTION_DEFINITIONS,
  },
  score: {
    type: Number,
    default: 0
  },
  is_multiple: {
    type: Boolean,
    default: false
  },
});

var ActionDefinition = (module.exports = mongoose.model('ActionDefinition', ActionDefinitionSchema));
