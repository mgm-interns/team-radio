/** *******************************************************
 *                                                        *
 *                                                        *
 *                      JOIN STATION                      *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';
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

    // Leave all staion has joined before
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

  /**
   * This conditional check if user already in station:
   * - If user not in station yet, allow join request and send notification
   * - If user already in station, allow join request and not send any notification
   */
  if (!alreadyInRoom) {
    _join(emitter, socket, userId, station, io);

    // Skip song decision when online user change
    skipDecider(io, station.station_id);

    // Send join notification
    if (user) {
      onlineManager.joinNotification(
        station.station_id,
        user.name || user.username || CONSTANTS.ANONYMOUS_NAME,
        emitter,
        io,
      );
    } else {
      onlineManager.joinNotification(
        station.station_id,
        CONSTANTS.ANONYMOUS_NAME,
        emitter,
        io,
      );
    }
  } else {
    _join(emitter, socket, userId, station, io);
  }
};

const _join = async (emitter, socket, userId, station, io) => {
  const stId = station.station_id;
  const stName = station.station_name;
  socket.join(station.station_id);
  const count = await onlineManager.countOnlineOfStation(stId, io);
  const users = await onlineManager.getListUserOnline(stId, io);

  emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
    station: station,
  });

  /**
   * An user cannot listening on multi station at a time
   * => Force any other tabs or browser redirect to most recent station
   */
  onlineManager.leaveStationAlreadyIn(userId, stId, stName, io);

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

  // Let switcher sort station list again when online user change
  switcher.updateNumberOfOnlineUsersInStation(
    station.station_id,
    await onlineManager.countOnlineOfStation(station.station_id, io),
  );
};
