import * as userController from '../../controllers/user';
import createEmitter from '../managers/createEmitter';
import { leaveNotification } from '../managers/onlineUserManager';

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
    socket.inStation = undefined;
    leaveNotification(stationId, userName, emitter, io);
  });
};

const _leaveStation = (socket, station) =>
  new Promise(resolve => {
    socket.leave(station, resolve);
  });
