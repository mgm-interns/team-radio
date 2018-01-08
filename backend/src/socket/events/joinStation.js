import * as EVENTS from '../../const/actions';
import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as players from '../../players';

export default async (emitter, userId, stationId, socket) => {
  let station;

  // Join station
  try {
    // Check if stationId is not exist, decline join request
    station = await stationController.getStation(stationId);
    // Force socket to leave all stations and then join stationId
    _leaveAllAndJoinStation(socket, stationId);
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
      emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, nowPlaying);
    } catch (err) {
      console.log('Players error: ' + err.message);
    }
  }

  // Check if user is not exist, notify that anonymous has joined
  if (station) {
    try {
      const { name } = await userController.getUserById(userId);
      emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: name,
      });
    } catch (err) {
      console.log('Join station log: ' + err);
      emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: 'Anonymous',
      });
    }
  }
};

const _leaveAllAndJoinStation = (socket, stationId) => {
  // Get all stations that socket is in
  const allStations = Object.keys(socket.rooms).slice(1);
  const leaveStationPromises = [];

  allStations.forEach(station => {
    leaveStationPromises.push(_leaveStation(socket, station));
  });

  Promise.all(leaveStationPromises).then(() => {
    socket.join(stationId);
    console.log('Join accept: ' + socket.id + ' joined to ' + stationId);
  });
};

const _leaveStation = (socket, station) =>
  new Promise(function(resolve, reject) {
    socket.leave(station, resolve);
  });
