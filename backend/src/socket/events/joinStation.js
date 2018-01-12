import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';
import * as onlineManager from '../managers/onlineUserManager';
import createEmitter from '../managers/createEmitter';
import skipDecider from '../managers/skipDecider';

export default async (io, socket, userId, stationId) => {
  const emitter = createEmitter(socket, io);
  let station;

  // Join station
  try {
    // Check if stationId is not exist, decline join request
    station = await stationController.getStation(stationId);
    _leaveAllAndJoinStation(socket, io, userId, station);
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
      emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
    } catch (err) {
      console.log('Players error: ' + err.message);
    }
  }
};

const _leaveAllAndJoinStation = async (socket, io, userId, station) => {
  await onlineManager.leaveAllStation(io, socket, userId);
  _joinStationProcess(socket, io, userId, station);
};

const _joinStationProcess = async (socket, io, userId, station) => {
  const emitter = createEmitter(socket, io);
  const stationId = station.station_id;

  // Join to new station and reassign param
  socket.join(stationId);

  emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
    station: station,
  });

  try {
    const user = await userController.getUserById(userId);
    socket.userId = userId;
    skipDecider(io, station.station_id);
    if (user.name) {
      onlineManager.joinNotification(
        station.station_id,
        user.name,
        emitter,
        io,
      );
    } else if (user.username) {
      onlineManager.joinNotification(
        station.station_id,
        user.username,
        emitter,
        io,
      );
    } else {
      onlineManager.joinNotification(
        station.station_id,
        'Someone',
        emitter,
        io,
      );
    }
  } catch (err) {
    onlineManager.joinNotification(station.station_id, 'Someone', emitter, io);
  }
};
