import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';
import * as onlineManager from '../managers/onlineUserManager';
import * as switcher from '../../switcher';
import createEmitter from '../managers/createEmitter';
import skipDecider from '../managers/skipDecider';

export default async (io, socket, userId, stationId) => {
  const emitter = createEmitter(socket, io);
  try {
    // Check if stationId is not exist, decline join request
    const station = await stationController.getStation(stationId);
    await onlineManager.leaveAllStation(io, socket, userId);
    _joinStationProcess(socket, io, userId, station);
  } catch (err) {
    socket.leaveAll();
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err.message,
    });
  }
};

const _joinStationProcess = async (socket, io, userId, station) => {
  const emitter = createEmitter(socket, io);
  const stationId = station.station_id;

  const user = await userController.getUserById(userId);
  socket.userId = user ? userId : undefined;

  // eslint-disable-next-line
  const alreadyInRoom =
    await onlineManager.userAlreadyInRoom(stationId, userId, io);

  if (!alreadyInRoom) {
    _join(emitter, socket, userId, station, io);
    skipDecider(io, station.station_id);
    if (user) {
      onlineManager.joinNotification(
        station.station_id,
        user.name || user.username || 'Someone',
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
  } else {
    _join(emitter, socket, userId, station, io);
  }
};

const _join = async (emitter, socket, userId, station, io) => {
  const stationId = station.station_id;
  socket.join(station.station_id);
  const count = await onlineManager.countOnlineOfStation(stationId, io);
  const users = await onlineManager.getListUserOnline(stationId, io);

  emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
    station: station,
  });

  onlineManager.leaveStationAlreadyIn(userId, stationId, io);

  // Get nowplaying and emit to user
  try {
    const player = await players.getPlayer(station.station_id);
    const nowPlaying = await player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
  } catch (err) {
    console.log('Players error: ' + err.message);
  }

  emitter.emit(EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });

  switcher.updateNumberOfOnlineUsersInStation(
    station.station_id,
    await onlineManager.countOnlineOfStation(station.station_id, io),
  );
};
