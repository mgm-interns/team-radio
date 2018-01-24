import SocketIO from 'socket.io';
import eventHandlers from './events';
import eventManager from './managers';
import * as players from '../players';
import * as EVENTS from '../const/actions';
import * as CONSTANTS from '../const/constants';
import createEmitter from './managers/createEmitter';

const io = SocketIO();

io.on('connection', socket => {
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
          action.payload.title,
          action.payload.thumbnail,
          action.payload.duration,
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
          CONSTANTS.UPVOTE_ACTION,
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
          CONSTANTS.DOWNVOTE_ACTION,
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
          action.payload.songUrl,
          action.payload.stationId,
        );
        console.log('Action received: ' + action.payload.stationId);
        break;

      case EVENTS.CLIENT_GET_FAVOURITE_SONG:
        console.log('Action received: ' + EVENTS.CLIENT_GET_FAVOURITE_SONG);
        eventHandlers.getFavouriteSongs(
          createEmitter(socket, io),
          action.payload.userId,
        );
        console.log(action.payload.userId);
        break;

      case EVENTS.CLIENT_SEARCH_STATION:
        console.log('Action received: ' + EVENTS.CLIENT_SEARCH_STATION);
        eventHandlers.searchStation(
          createEmitter(socket, io),
          action.payload.query,
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
