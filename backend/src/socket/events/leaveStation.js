import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import { countOnlineUserOfStation } from '../managers/onlineUserManager';
import createEmitter from '../managers/createEmitter';

export default async (io, socket, userId, stationId) => {
  const emitter = createEmitter(socket, io);
  try {
    const { userName } = await userController.getUserById(userId);
    _leaveAllAndEmit(socket, io, stationId, emitter, userName);
  } catch (err) {
    _leaveAllAndEmit(socket, io, stationId, emitter, 'Anounymous');
  }
};

const _leaveAllAndEmit = (socket, io, stationId, emitter, userName) => {
  // Get all stations that socket is in
  const allStations = Object.keys(socket.rooms).slice(1);
  const leaveStationPromises = [];

  allStations.forEach(station => {
    leaveStationPromises.push(_leaveStation(socket, station));
  });

  Promise.all(leaveStationPromises).then(() => {
    emitter.emit(EVENTS.SERVER_LEAVE_STATION_SUCCESS, {});
    emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
      user: userName,
    });
    socket.inStation = undefined;
    socket.userId = undefined;
    _updateOnlineUser(stationId, emitter, io);
  });
};

const _leaveStation = (socket, station) =>
  new Promise(resolve => {
    socket.leave(station, resolve);
  });

const _updateOnlineUser = async (stationId, emitter, io) => {
  try {
    const onlineUsers = await countOnlineUserOfStation(stationId, io);
    emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
      online_count: onlineUsers,
    });
  } catch (err) {
    console.log('Online manager error: ' + err.message);
  }
};
