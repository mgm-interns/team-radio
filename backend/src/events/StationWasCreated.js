import * as scoreLogController from '../controllers/scoreLogController';
import * as actionDefinitionController from '../controllers/actionDefinitionController';
import * as userController from '../controllers/user';
import config from '../config/index';

export default (emitter,moduleEmitter)  => {
    updateReputaionWhenCreateStation(emitter,moduleEmitter);
};

const updateReputaionWhenCreateStation = (emitter,moduleEmitter) => {
    moduleEmitter.on(config.events.STATION_WAS_CREATED, async (userId, actionKey) => {
        let action = await actionDefinitionController.getActionDefinitionByKey(actionKey);
        await scoreLogController.createScoreLog(userId, action.score, action.action_key);
        let user = await userController.getUserById(userId);
        user = await userController.updateUserReputation(user, action.score);
        emitter.emit(config.events.SET_USER_SCORE_SUCCESS, {
            ...user._doc,
            userId: user._id,
        });
    });
};
