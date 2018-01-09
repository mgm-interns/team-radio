import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import { countOnlineUserOfStation } from '../managers/onlineUserManager';

export default async (emitter, userId, stationId, socket, io) => {
  try {
    const { userName } = await userController.getUserById(userId);
    socket.leaveAll();
    emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
      user: userName,
    });
  } catch (err) {
    socket.leaveAll();
    console.log('Error leave station: ' + err);
  }

  try {
    const onlineUsers = await countOnlineUserOfStation(stationId, io);
    emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
      onlineCount: onlineUsers,
    });
  } catch (err) {
    console.log('Online manager error: ' + err.message);
  }
};
