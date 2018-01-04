/* eslint-disable one-var */
import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';

// eslint-disable-next-line one-var
export default async (emitter, userId, stationId, socket) => {
  let station;
  try {
    // Check if station is not exist, throw err and send to client
    station = await stationController.getStation(stationId);
    _leaveAllAndJoinStation(socket, stationId);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
      station: station,
    });

    // check if user not exist, allow anonymous user to join station!
    try {
      const user = await userController.getUserById(userId);
      emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: user.name,
      });
    } catch (err) {
      console.log('Join station log: ' + err);
      emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: 'Anonymous',
      });
    }
  } catch (err) {
    console.error('Error join station: ' + err);
    socket.leaveAll();
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err.message,
    });
  }

  if (station) {
    const player = await players.getPlayer(stationId);
    const nowPlaying = await player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
  }
};

const _leaveAllAndJoinStation = (socket, stationId) => {
  const allStations = Object.keys(socket.rooms).slice(1);
  const leaveStationPromises = [];

  allStations.forEach(station => {
    leaveStationPromises.push(_leaveStation(socket, station));
  });

  Promise.all(leaveStationPromises).then(() => {
    socket.join(stationId);
    console.log('Join accept: ' + socket.id + ' join to ' + stationId);
  });
};

const _leaveStation = (socket, station) =>
  new Promise(function(resolve, reject) {
    socket.leave(station, resolve);
  });
