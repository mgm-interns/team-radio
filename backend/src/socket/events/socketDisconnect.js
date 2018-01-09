import * as onlineManager from '../managers/onlineUserManager';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import createEmitter from '../managers/createEmitter';

export default async (io, socket) => {
  const stationId = socket.inStation;
  const emitter = createEmitter(socket, io);
  try {
    const { name } = await userController.getUserById(socket.userId);
    _disconnectHandler(stationId, name, emitter, io);
  } catch (err) {
    _disconnectHandler(stationId, 'Anonymous', emitter, io);
  }
};

const _disconnectHandler = async (stationId, name, emitter, io) => {
  const count = await onlineManager.countOnlineUserOfStation(stationId, io);
  emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
    user: name,
  });
  emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
    station_id: stationId,
    online_count: count,
  });
};
