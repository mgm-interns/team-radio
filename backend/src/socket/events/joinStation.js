import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';
import * as onlineManager from '../managers/onlineUserManager';
import createEmitter from '../managers/createEmitter';
import skipDecider from '../managers/skipDecider';

export default async (io, socket, userId, stationId) => {
  const emitter = createEmitter(socket, io);

  // Get station that the user already in
  // eslint-disable-next-line
  const stationAlreadyIn =
    await onlineManager.getStationUserAlreadyIn(userId, socket, io);

  /**
   * This condition checks if the user is in a station.
   * Then, if the user requests to join a station that is not the current station
   * => join decline and send an error message
   */
  if (stationAlreadyIn && stationAlreadyIn !== stationId) {
    emitter.emit(EVENTS.SERVER_ALREADY_IN_A_STATION, {
      stationId: stationAlreadyIn,
    });
    return;
  }

  // Join station
  try {
    // Check if stationId is not exist, decline join request
    const station = await stationController.getStation(stationId);
    _leaveAllAndJoinStation(socket, io, userId, station);
  } catch (err) {
    socket.leaveAll();
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err.message,
    });
  }
};

const _leaveAllAndJoinStation = async (socket, io, userId, station) => {
  await onlineManager.leaveAllStation(io, socket, userId);
  _joinStationProcess(socket, io, userId, station);
};

const _joinStationProcess = async (socket, io, userId, station) => {
  const emitter = createEmitter(socket, io);
  const stationId = station.station_id;

  try {
    const user = await userController.getUserById(userId);
    socket.userId = userId;

    // eslint-disable-next-line
    const alreadyInRoom =
      await onlineManager.userAlreadyInRoom(stationId, userId, io);

    if (!alreadyInRoom) {
      _join(emitter, socket, station);
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
    } else {
      _join(emitter, socket, station);
      const count = await onlineManager.countOnlineOfStation(stationId, io);
      const users = await onlineManager.getListUserOnline(stationId, io);
      emitter.emit(EVENTS.SERVER_UPDATE_ONLINE_USERS, {
        online_count: count,
        users: users,
      });
    }
  } catch (err) {
    onlineManager.joinNotification(station.station_id, 'Someone', emitter, io);
  }
};

const _join = async (emitter, socket, station) => {
  socket.join(station.station_id);

  emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
    station: station,
  });

  // Get nowplaying and emit to user
  try {
    const player = await players.getPlayer(station.station_id);
    const nowPlaying = await player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
  } catch (err) {
    console.log('Players error: ' + err.message);
  }
};
