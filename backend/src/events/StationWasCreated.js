import * as scoreLogController from '../controllers/scoreLogController';
import * as actionDefinitionController from '../controllers/actionDefinitionController';
import * as userController from '../controllers/user';
import config from '../config/index';

module.exports = (moduleEmitter) => {
  // create score log and update user reputation
  moduleEmitter.on(config.events.STATION_WAS_CREATED, async (userId, actionKey) => {
    let action = await actionDefinitionController.getActionDefinitionByKey(actionKey);
    let log = await scoreLogController.createScoreLog(userId, action.score, action.action_key);
    let user = await userController.getUserById(userId);
    await userController.updateUserReputation(user, action.score);
  });
};
