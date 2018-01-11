import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';
import createEmitter from '../managers/createEmitter';
import {
  joinNotification,
  leaveNotification,
} from '../managers/onlineUserManager';
import skipDecider from '../managers/skipDecider';

export default async (io, socket, userId, stationId) => {
  const emitter = createEmitter(socket, io);
  let station;

  // Join station
  try {
    // Check if stationId is not exist, decline join request
    station = await stationController.getStation(stationId);
    // Force socket to leave all stations and then join stationId
    _leaveAllAndJoinStation(socket, io, userId, stationId);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.error('Error join station: ' + err);
    socket.leaveAll();
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err.message,
    });
  }

  // If join success, get nowplaying and emit to user
  if (station) {
    try {
      const player = await players.getPlayer(stationId);
      const nowPlaying = await player.getNowPlaying();
      // if have no song is playing, do not update nowPlaying
      if (nowPlaying.url)
        emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
    } catch (err) {
      console.log('Players error: ' + err.message);
    }
  }
};

const _leaveAllAndJoinStation = (socket, io, userId, stationId) => {
  // Get all stations that socket is in
  const allStations = Object.keys(socket.rooms).slice(1);
  const leaveStationPromises = [];

  allStations.forEach(station => {
    leaveStationPromises.push(_leaveStation(socket, station));
  });

  Promise.all(leaveStationPromises).then(() => {
    _joinStationProcess(socket, io, userId, stationId);
  });
};

const _joinStationProcess = async (socket, io, userId, stationId) => {
  const emitter = createEmitter(socket, io);
  const stationJoined = socket.inStation;

  // If socket joined any station before, notify old station that socket just leave
  if (stationJoined) {
    try {
      const { name } = await userController.getUserById(socket.userId);
      skipDecider(io, stationJoined);
      leaveNotification(stationJoined, name, emitter, io);
    } catch (err) {
      skipDecider(io, stationJoined);
      leaveNotification(stationJoined, 'Anonymous', emitter, io);
    }
  }

  // Join to new station and reassign param
  socket.join(stationId);
  socket.inStation = stationId;
  try {
    const { name } = await userController.getUserById(userId);
    socket.userId = userId;
    skipDecider(io, stationId);
    joinNotification(stationId, name, emitter, io);
  } catch (err) {
    skipDecider(io, stationId);
    joinNotification(stationId, 'Anonymous', emitter, io);
  }
  console.log('Join accept: ' + socket.id + ' joined to ' + stationId);
};

const _leaveStation = (socket, station) =>
  new Promise(resolve => {
    socket.leave(station, resolve);
  });
