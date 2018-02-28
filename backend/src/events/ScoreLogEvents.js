import * as scoreLogController from '../controllers/scoreLogController';
import * as actionDefinitionController from '../controllers/actionDefinitionController';
import * as userController from '../controllers/user';
import config from '../config/index';
import * as stationModels from '../models/station';
import * as EVENTS from "../const/actions";

export default (emitter, moduleEmitter) => {
    StationWasCreated(emitter, moduleEmitter);
    SongWasAdded(emitter, moduleEmitter);
};

const StationWasCreated = (emitter, moduleEmitter) => {
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

const SongWasAdded = (emitter, moduleEmitter) => {
    moduleEmitter.on(config.events.SONG_WAS_ADDED, async (userId, actionKey, stationId, songUrl) => {

        let score_description = {
            station_id: stationId,
            song_url: songUrl
        };

        let station = await stationModels.getStationById(stationId);
        if (station && (userId !== station.owner_id.toString())) {
            let action = await actionDefinitionController.getActionDefinitionByKey(actionKey);
            await scoreLogController.createScoreLog(userId, action.score, action.action_key, score_description);
            let user = await userController.getUserById(station.owner_id);
            user = await userController.updateUserReputation(user, action.score);

            emitter.emitToUser(user._id, config.events.SET_USER_SCORE_SUCCESS, {
                ...user._doc,
                userId: user._id
            });
        }
    });
};

