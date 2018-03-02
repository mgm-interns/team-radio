import SocketIO from 'socket.io';
import eventHandlers from './events';
import eventManager from './managers';
import createEmitter from './managers/createEmitter';
import * as onlineManager from './managers/onlineUserManager';
import * as players from '../players';
import * as EVENTS from '../const/actions';
import * as CONSTANTS from '../const/constants';
import event from '../events';

// Create web socket
const io = SocketIO();

// Create module events
let events = require('events');

// Listening for Web socket events
io.on('connection', socket => {
    let moduleEmitter = new events.EventEmitter();
    eventHandlers.socketConnect(createEmitter(socket, io));
    event.ScoreLogEvents(createEmitter(socket, io), moduleEmitter);
    // Listening for action request
    socket.on('action', action => {
        switch (action.type) {
            case EVENTS.CLIENT_CREATE_STATION:
                eventHandlers.createStation(
                    createEmitter(socket, io),
                    action.payload.userId,
                    action.payload.stationName,
                    action.payload.isPrivate,
                    moduleEmitter,
                );
                break;

      case EVENTS.CLIENT_JOIN_STATION:
        eventHandlers.joinStation(
          io,
          socket,
          action.payload.userId,
          action.payload.stationId,
        );
        break;

      case EVENTS.CLIENT_LEAVE_STATION:
        eventHandlers.leaveStation(socket, action.payload.userId);
        break;

      case EVENTS.CLIENT_ADD_SONG:
        eventHandlers.addSong(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songUrl,
          action.payload.title,
          action.payload.thumbnail,
          action.payload.duration,
          action.payload.songMessage,
          action.payload.localstations,
            moduleEmitter
        );
        break;

      case EVENTS.CLIENT_ADD_MULTI_SONG:
        eventHandlers.addMultiSong(
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songList,
        );
        break;

      case EVENTS.CLIENT_UPVOTE_SONG:
        eventHandlers.voteSong(
          CONSTANTS.UPVOTE_ACTION,
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;

      case EVENTS.CLIENT_DOWNVOTE_SONG:
        eventHandlers.voteSong(
          CONSTANTS.DOWNVOTE_ACTION,
          createEmitter(socket, io),
          action.payload.userId,
          action.payload.stationId,
          action.payload.songId,
        );
        break;

      case EVENTS.CLIENT_FAVOURITE_SONG:
        eventHandlers.addFavourite(
          createEmitter(socket, io),
          action.payload.songId,
          action.payload.userId,
          action.payload.songUrl,
          action.payload.stationId,
        );
        break;

      case EVENTS.CLIENT_GET_FAVOURITE_SONG:
        eventHandlers.getFavouriteSongs(
          createEmitter(socket, io),
          action.payload.userId,
        );
        break;

      case EVENTS.CLIENT_REDIRECT_STATION:
        eventHandlers.redirectStation(
          createEmitter(socket, io),
          socket,
          action.payload.userId,
          action.payload.stationId,
        );
        break;

      case EVENTS.CLIENT_SEARCH_STATION:
        eventHandlers.searchStation(
          createEmitter(socket, io),
          action.payload.query,
        );
        break;

      case EVENTS.CLIENT_LOAD_STATION_PAGING:
          eventHandlers.loadStationPaging(
              createEmitter(socket, io),
              EVENTS.CLIENT_LOAD_STATION_PAGING
          );
          break;
            case EVENTS.CLIENT_SEND_USERID:
                if(action && action.payload && action.payload.userId)
                    socket.join(action.payload.userId);
                break;

      default:
        eventManager.stationEvents(io, socket, action);
        eventManager.songEvents(io, socket, action);
        eventManager.chatEvents(io, socket, action);
        break;
    }
  });

  // Handle when socket disconnect
  socket.on('disconnecting', () => {
    eventHandlers.socketDisconnect(socket);
  });
});

// Attach web socket for Player
players.attachWebSocket(io);

// Attach web socket for online user manager
onlineManager.attachSocketIO(io);

export default io;
