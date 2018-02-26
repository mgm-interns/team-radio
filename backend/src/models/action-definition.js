import mongoose from 'mongoose';
import config from '../config/index';

const ActionDefinitionSchema = mongoose.Schema({
  action_key: {
    type: String,
    require: true,
    enum: Object.values(config.action.ACTION_DEFINITIONS),
    unique: true,
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

module.exports.createActionDefinition = async (actionKey, score, isMultiple = false) => {
  return ActionDefinition.create(
    {
      action_key : actionKey,
      score : score,
      is_multiple : isMultiple
    }, function (error, data) {
      if (error) {
        console.log(error);
      }
      return data;
    }
  );
};

module.exports.getActionDefinitionByKey = async actionKey => {
  return ActionDefinition.findOne({ action_key: actionKey}).exec();
};
