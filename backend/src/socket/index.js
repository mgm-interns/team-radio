import SocketIO from 'socket.io';
import eventHandlers from './events';
import * as players from '../players';
import * as EVENTS from '../const/actions';
import * as stationController from '../controllers/station';
import * as onlineManager from './managers/onlineUserManager';
import createEmitter from './managers/createEmitter';

const io = SocketIO();

io.on('connection', async function(socket) {
  console.log('Connected with ' + socket.id);
  _newConnectionHandler(socket, io);

  // Listening for action request
  socket.on('action', action => {
    switch (action.type) {
      case EVENTS.CLIENT_CREATE_STATION:
        console.log('Action: ' + EVENTS.CLIENT_CREATE_STATION);
        eventHandlers.createStationHandler(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationName,
        );
        break;

      case EVENTS.CLIENT_JOIN_STATION:
        console.log('Action: ' + EVENTS.CLIENT_JOIN_STATION);
        eventHandlers.joinStationHandler(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          socket,
          io,
        );
        break;

      case EVENTS.CLIENT_LEAVE_STATION:
        console.log('Action: ' + EVENTS.CLIENT_LEAVE_STATION);
        eventHandlers.leaveStationHandler(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          socket,
          io,
        );
        break;

      case EVENTS.CLIENT_ADD_SONG:
        console.log('Action: ' + EVENTS.CLIENT_ADD_SONG);
        eventHandlers.addSongHandler(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        console.log('Action: ' + EVENTS.CLIENT_UPVOTE_SONG);
        if (action.payload.userId !== '0') {
          eventHandlers.voteSongHandler(
            createEmitter(socket, io),
            1,
            action.payload.userId,
            action.payload.stationId,
            action.payload.songId,
          );
        } else {
          socket.emit(EVENTS.SERVER_UPVOTE_SONG_FAILURE, {
            message: 'Anonymous users can not vote song',
          });
        }
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        console.log('Action: ' + EVENTS.CLIENT_DOWNVOTE_SONG);
        if (action.payload.userId !== '0') {
          eventHandlers.voteSongHandler(
            createEmitter(socket, io),
            -1,
            action.payload.userId,
            action.payload.stationId,
            action.payload.songId,
          );
        } else {
          socket.emit(EVENTS.SERVER_DOWNVOTE_SONG_FAILURE, {
            message: 'Anonymous users can not vote song',
          });
        }
        break;

      case EVENTS.CLIENT_CHECK_EXISTS_EMAIL:
        console.log('Action: ' + EVENTS.CLIENT_CHECK_EXISTS_EMAIL);
        eventHandlers.checkExistUserHandler(
          createEmitter(socket, io),
          action.payload.email,
        );
        break;
      default:
        break;
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnect with ' + socket.id);
  });
});

const _newConnectionHandler = async (socket, fnIo) => {
  const emitter = createEmitter(socket, fnIo);
  // Emit all stations when user connect
  try {
    const allStations = await stationController.getAllAvailableStations();
    updateStationList(allStations, emitter, fnIo);
  } catch (err) {
    console.log(EVENTS.SERVER_UPDATE_STATIONS + ' fail! Error: ' + err);
  }
};

const updateStationList = async (stations, emitter, fnIo) => {
  const onlineCountData = await onlineManager.countOnlineUserOfAllStations(
    stations,
    fnIo,
  );
  emitter.emit(EVENTS.SERVER_UPDATE_STATIONS, {
    stations: mergeOnlineCountToStation(stations, onlineCountData),
  });
};

const mergeOnlineCountToStation = (stations, onlineCountData) =>
  stations.map((station, index) => {
    const { onlineCount } = onlineCountData[index];
    return {
      ...station,
      onlineCount,
    };
  });

players.attachWebSocket(io);

export default io;
