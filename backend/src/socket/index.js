import SocketIO from 'socket.io';
import eventHandlers from './events';
import eventManager from './managers';
import * as players from '../players';
import * as EVENTS from '../const/actions';
import createEmitter from './managers/createEmitter';

const io = SocketIO();
export const UPVOTE_ACTION = 1;
export const DOWNVOTE_ACTION = -1;

io.on('connection', async function (socket) {
  console.log('Connected with ' + socket.id);
  eventHandlers.socketConnect(io, socket);

  // Listening for action request
  socket.on('action', action => {
    switch (action.type) {
      case EVENTS.CLIENT_CREATE_STATION:
        eventHandlers.createStation(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationName,
          action.payload.isPrivate,
        );
        break;

      case EVENTS.CLIENT_JOIN_STATION:
        console.log('Action received: ' + EVENTS.CLIENT_JOIN_STATION);
        eventHandlers.joinStation(
          io,
          socket,
          action.payload.userId,
          action.payload.stationId,
        );
        break;

      case EVENTS.CLIENT_LEAVE_STATION:
        console.log('Action received: ' + EVENTS.CLIENT_LEAVE_STATION);
        eventHandlers.leaveStation(io, socket, action.payload.userId);
        break;

      case EVENTS.CLIENT_ADD_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_ADD_SONG);
        eventHandlers.addSong(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
        );
        break;

      case EVENTS.CLIENT_ADD_MULTI_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_ADD_MULTI_SONG);
        eventHandlers.addMultiSong(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songList,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_UPVOTE_SONG);
        eventHandlers.voteSong(
          UPVOTE_ACTION,
          io,
          socket,
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_DOWNVOTE_SONG);
        eventHandlers.voteSong(
          DOWNVOTE_ACTION,
          io,
          socket,
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;
      case EVENTS.CLIENT_FAVOURITE_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_FAVOURITE_SONG);
        eventHandlers.addFavourite(
          createEmitter(socket, io),
          action.payload.songId,
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
        );
        break;
      default:
        eventManager.chatEvents(io, socket, action);
        break;
    }
  });

  socket.on('disconnecting', () => {
    eventHandlers.socketDisconnect(io, socket);
    console.log('Disconnect with ' + socket.id);
  });
});

players.attachWebSocket(io);

export default io;
