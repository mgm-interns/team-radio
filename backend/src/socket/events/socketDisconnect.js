import * as userController from '../../controllers/user';
import createEmitter from '../managers/createEmitter';
import skipDecider from '../managers/skipDecider';
import { leaveNotification } from '../managers/onlineUserManager';

export default async (io, socket) => {
  socket.leaveAll();
  const stationId = socket.inStation;
  // If socket joined any station before, notify old station that socket just leave
  if (stationId) {
    const emitter = createEmitter(socket, io);
    try {
      const { name } = await userController.getUserById(socket.userId);
      leaveNotification(stationId, name, emitter, io);
      skipDecider(io, stationId);
    } catch (err) {
      leaveNotification(stationId, 'Anonymous', emitter, io);
      skipDecider(io, stationId);
    }
  }
};
