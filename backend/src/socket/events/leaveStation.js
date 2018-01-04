import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationId, socket) => {
  try {
    const user = await userController.getUserById(userId);
    socket.leaveAll();
    emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};
