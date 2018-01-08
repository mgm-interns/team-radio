import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationId, socket) => {
  try {
    const { userName } = await userController.getUserById(userId);
    socket.leaveAll();
    emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
      user: userName,
    });
  } catch (err) {
    console.log('Error leave station: ' + err);
  }
};
