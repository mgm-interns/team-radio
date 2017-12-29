import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationId) => {
  try {
    const user = await userController.getUser(userId);
    emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
      user: user,
    });
  } catch (err) {
    console.error(err);
  }
};