/**
 * Set up websocket
 */
import SocketIO from 'socket.io';
import eventHandlers from './events';
import * as players from '../players';
import * as EVENTS from '../const/actions';
import * as stationController from '../controllers/station';

const io = SocketIO();

io.on('connection', async function(socket) {
  console.log('Connected with ' + socket.id);
  // Emit all stations when user connect
  try {
    const allStations = await stationController.getAllAvailableStations();
    console.log('Emit to ' + socket.id + ' all stations');
    socket.emit('action', {
      type: EVENTS.SERVER_UPDATE_STATIONS,
      payload: {
        stations: allStations,
      },
    });
  } catch (err) {
    console.log(EVENTS.SERVER_UPDATE_STATIONS + ' fail! Error: ' + err);
  }

  // Listening for action request
  socket.on('action', action => {
    switch (action.type) {
      case EVENTS.CLIENT_CREATE_STATION:
        console.log('Action: ' + EVENTS.CLIENT_CREATE_STATION);
        eventHandlers.createStationHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationName,
        );
        break;

      case EVENTS.CLIENT_JOIN_STATION:
        console.log('Action: ' + EVENTS.CLIENT_JOIN_STATION);
        eventHandlers.joinStationHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationId,
          socket,
        );
        break;

      case EVENTS.CLIENT_LEAVE_STATION:
        console.log('Action: ' + EVENTS.CLIENT_LEAVE_STATION);
        eventHandlers.leaveStationHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationId,
          socket,
        );
        break;

      case EVENTS.CLIENT_ADD_SONG:
        console.log('Action: ' + EVENTS.CLIENT_ADD_SONG);
        eventHandlers.addSongHandler(
          createEmitter(socket),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        console.log('Action: ' + EVENTS.CLIENT_UPVOTE_SONG);
        if (action.payload.userId !== '0') {
          eventHandlers.voteSongHandler(
            createEmitter(socket),
            1,
            action.payload.userId,
            action.payload.stationId,
            action.payload.songId,
          );
        } else {
          socket.emit('action', {
            message: 'Anonymous users can not vote song',
          });
        }
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        console.log('Action: ' + EVENTS.CLIENT_DOWNVOTE_SONG);
        if (action.payload.userId !== '0') {
          eventHandlers.voteSongHandler(
            createEmitter(socket),
            -1,
            action.payload.userId,
            action.payload.stationId,
            action.payload.songId,
          );
        } else {
          socket.emit('action', {
            message: 'Anonymous users can not vote song',
          });
        }
        break;

      case EVENTS.CLIENT_CHECK_EXISTS_EMAIL:
        console.log('Action: ' + EVENTS.CLIENT_CHECK_EXISTS_EMAIL);
        eventHandlers.checkExistUserHandler(
          createEmitter(socket),
          action.payload.email,
        );
        break;
      default:
        break;
    }
  });

  socket.on('disconnect', () => {
    socket.leaveAll();
    console.log('Disconnect with ' + socket.id);
  });
});

const createEmitter = socket => ({
  emit: (eventName, payload) => {
    socket.emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Emit to: ' + socket.id + ' type: ' + eventName + ' payload: ' + payload,
    );
  },
  emitToStation: (stationId, eventName, payload) => {
    io.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Emit to station: ' +
        stationId +
        ', type: ' +
        eventName +
        ', payload: ' +
        payload,
    );
  },
  broadcastToStation: (stationId, eventName, payload) => {
    // Use broadcast to emit room except sender
    socket.broadcast.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log(
      'Broadcast to station: ' +
        stationId +
        ', type: ' +
        eventName +
        ', payload: ' +
        payload,
    );
  },
  emitAll: (eventName, payload) => {
    io.emit('action', {
      type: eventName,
      payload: payload,
    });
    console.log('Emit to all, type: ' + eventName + ' payload: ' + payload);
  },
});

players.attachWebSocket(io);

export default io;
