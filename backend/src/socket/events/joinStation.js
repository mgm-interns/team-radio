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

    // Leave all station has joined before
    await onlineManager.leaveAllStation(socket, userId);

    _joinStationProcess(emitter, socket, userId, station);
  } catch (err) {
    socket.leaveAll();
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err.message,
    });
  }
};

const _joinStationProcess = async (emitter, socket, userId, station) => {
  const stationId = station.station_id;

  const user = await userController.getUserById(userId);
  socket.userId = user ? userId : undefined;

  // eslint-disable-next-line
  const alreadyInRoom = await onlineManager.userAlreadyInRoom(
    stationId,
    userId,
  );

  /**
   * This conditional check if user already in station:
   * - If user not in station yet, allow join request and send notification
   * - If user already in station, allow join request and not send any notification
   */
  if (!alreadyInRoom) {
    if (userId) stationController.joinStation(stationId, userId);
    _join(emitter, socket, userId, station);

    // Skip song decision when online user change
    skipDecider(userId, stationId);

    // Send join notification
    if (user) {
      onlineManager.joinNotification(
        station.station_id,
        user.name || user.username || CONSTANTS.ANONYMOUS_NAME,
        emitter,
      );
    } else {
      onlineManager.joinNotification(
        station.station_id,
        CONSTANTS.ANONYMOUS_NAME,
        emitter,
      );
    }
  } else {
    _join(emitter, socket, userId, station);
  }
};

/**
 * TODO: Enhancement performance:
 * - Use Promise All instead of await
 * - Some other way.
 */
const _join = async (emitter, socket, userId, station) => {
  const stationId = station.station_id;
  const stationName = station.station_name;
  socket.join(stationId);

  /**
   * An user cannot listening on multi station at a time
   * => Force any other tabs or browser redirect to most recent station
   */
  onlineManager.leaveStationAlreadyIn(userId, stationId, stationName, socket);

  // Notify join success
  delete station.playlist;
  emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
    station: station,
  });

  // Update users online in station
  const count = await onlineManager.countOnlineOfStation(stationId);
  const users = await onlineManager.getListUserOnline(stationId);
  emitter.emit(EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });

  // Update playlist
  const playlist = await stationController.getAvailableListSong(stationId);
  emitter.emit(EVENTS.SERVER_UPDATE_PLAYLIST, {
    playlist: playlist,
  });

  // Update nowplaying
  try {
    const player = await players.getPlayer(stationId);
    const nowPlaying = await player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
  } catch (err) {
    console.log('Players error: ' + err.message);
  }

  // Update history
  // eslint-disable-next-line
  const history = await stationController.getListSongHistory(
    stationId,
    CONSTANTS.HISTORY_LIMIT,
  );
  emitter.emit(EVENTS.SERVER_UPDATE_HISTORY, {
    history: history,
  });

  // Let switcher sort station list again when online user change
  switcher.updateNumberOfOnlineUsersInStation(stationId, count);

  // update Station Score
  try {
    const stationScores = await stationController.getStationScores(stationId);
    emitter.emit(EVENTS.SERVER_UPDATE_STATION_SCORE, stationScores);
  } catch (err) {
    console.log('update station scores error: ' + err.message);
  }

  // Update station chat
  const stationChats = await stationController.getChatInStation(stationId);
  emitter.emit(EVENTS.SERVER_UPDATE_STATION_CHAT, stationChats);
};
