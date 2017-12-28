/**
 * Set up websocket
 */
import SocketIO from 'socket.io';
import eventHandlers from './events';
import * as players from '../players';
import * as EVENTS from '../const/actions';

const io = SocketIO();

const createEmitter = socket => {
  return {
    emit: (eventName, payload) => {
      socket.emit('action', {
        type: eventName,
        payload: payload,
      });
    },
    emitToStation: (stationId, eventName, payload) => {
      io.to(stationId).emit('action', {
        type: eventName,
        payload: payload,
      });
    },
    emitAll: (eventName, payload) => {
      io.emit('action', {
        type: eventName,
        payload: payload,
      });
    },
  };
};

io.on('connection', async function(socket) {
  socket.on('action', action => {
    switch (action.type) {
      case EVENTS.CLIENT_CREATE_STATION:
        eventHandlers.createStationHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationName,
        );
        break;

      case EVENTS.CLIENT_JOIN_STATION:
        _leaveAllAndJoinRoom(socket, action.payload.stationId);
        try {
          eventHandlers.joinStationHandler(
            createEmitter(socket),
            action.payload.userId,
            action.payload.stationId,
          );
        } catch (err) {
          console.log(err);
          socket.leaveAll();
        }
        break;

      case EVENTS.CLIENT_LEAVE_STATION:
        socket.leaveAll();
        eventHandlers.leaveStationHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationId,
        );
        break;

      case EVENTS.CLIENT_ADD_SONG:
        eventHandlers.addSongHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        // TODO: WIP
        eventHandlers.voteSongHandler(
          createEmitter(socket),
          1,
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        // TODO: WIP
        eventHandlers.voteSongHandler(
          createEmitter(socket),
          -1,
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;
      default:
        break;
    }
  });
});

const _leaveAllAndJoinRoom = (socket, stationId) => {
  const allRooms = Object.keys(socket.rooms).slice(1);
  const leaveRoomPromises = [];

  allRooms.forEach(room => {
    leaveRoomPromises.push(_leaveRoom(socket, room));
  });

  Promise.all(leaveRoomPromises).then(() => {
    socket.join(stationId);
  });

};

const _leaveRoom = (socket, room) => {
  return new Promise(function (resolve, reject) {
		socket.leave(room, resolve);
	});
};

players.attachWebSocket(io);

export default io;
