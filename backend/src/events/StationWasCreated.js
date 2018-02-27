import * as scoreLogController from '../controllers/scoreLogController';
import * as actionDefinitionController from '../controllers/actionDefinitionController';
import * as userController from '../controllers/user';
import config from '../config/index';

module.exports = (emitter, moduleEmitter) => {
  // create score log and update user reputation
  moduleEmitter.on(config.events.STATION_WAS_CREATED, async (userId, actionKey) => {
    let action = await actionDefinitionController.getActionDefinitionByKey(actionKey);
    let log = await scoreLogController.createScoreLog(userId, action.score, action.action_key);
    var user = await userController.getUserById(userId);
    user = await userController.updateUserReputation(user, action.score);
    emitter.emit(config.events.SET_USER_INFORMATION_SUCCESS, {
      ...user._doc,
      userId: user._id,
    });
  });
};
