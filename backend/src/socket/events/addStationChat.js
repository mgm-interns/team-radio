import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, { stationId, userId, message }) => {
  try {
    const {
      name: userName,
      avatar_url: userAvatar,
    } = await userController.getUserById(userId);

    const chat = {
      stationId,
      userId,
      userName,
      userAvatar,
      message,
    };

    await stationController.addChatInStation(stationId, chat);

    // Emit success event to sender
    emitter.emit(EVENTS.CLIENT_ADD_STATION_SUCCESS, chat);
    // Emit to other people in station
    emitter.broadcastToStation(stationId, EVENTS.SERVER_CHANGE_STATION_CHAT, [
      chat,
    ]);
  } catch (error) {
    // Emit failure event to sender if there is any exceptions
    emitter.emit(EVENTS.CLIENT_ADD_STATION_FAILURE, {
      message: error,
    });
  }
};
