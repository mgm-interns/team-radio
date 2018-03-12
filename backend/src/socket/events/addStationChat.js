import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, { stationId, userId, message }) => {
  try {
    await stationController.addChatInStation(stationId, {
      userId,
      message,
    });

    const response = {
      message,
      sender: normalizeUser(await userController.getUserById(userId)),
    };

    // Emit success event to sender
    emitter.emit(EVENTS.SERVER_ADD_STATION_CHAT_SUCCESS, response);
    // Emit to other people in station
    emitter.broadcastToStation(stationId, EVENTS.SERVER_CHANGE_STATION_CHAT, [
      response,
    ]);
  } catch (error) {
    // Emit failure event to sender if there is any exceptions
    emitter.emit(EVENTS.SERVER_ADD_STATION_CHAT_FAILURE, {
      message: error,
    });
  }
};

/**
 * Make sure that the response only include necessary information
 *
 * @param user
 * @returns {{_id: *, username: *, avatar_url: *, name: *}}
 */
const normalizeUser = user => ({
  _id: user._id,
  username: user.username,
  avatar_url: user.avatar_url,
  name: user.name,
});
