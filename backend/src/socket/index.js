/**
 * Set up websocket
 */
import SocketIO from 'socket.io';
import eventHandlers from './events';
import players from '../players';

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
          action.payload.stationName,
          action.payload.userId,
        );
        break;

      case EVENTS.CLIENT_JOIN_STATION:
        // handler socket join station
        socket.leaveAll();
        socket.join(action.payload.stationId);

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
        eventHandlers.leaveStationHandler(createEmitter(socket), userId);
        break;

      case EVENTS.CLIENT_ADD_SONG:
        eventHandlers.addSongHandler(
          createEmitter(socket),
          action.payload.stationId,
          action.payload.songUrl,
          action.payload.userId,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        // TODO: WIP
        eventHandlers.voteSongHandler(
          createEmitter(socket),
          1,
          action.payload.stationId,
          action.payload.songId,
          action.payload.userId,
        );
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        // TODO: WIP
        eventHandlers.voteSongHandler(
          createEmitter(socket),
          -1,
          action.payload.stationId,
          action.payload.songId,
          action.payload.userId,
        );
        break;
      default:
        break;
    }
  });
});

players.attachWebSocket(io);

export default io;
