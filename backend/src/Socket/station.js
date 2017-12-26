import stationController from '../Controllers/StationController';
import userController from '../Controllers/UserController';
import {
  CLIENT_CREATE_STATION,
  CLIENT_JOIN_STATION,
  CLIENT_LEAVE_STATION,
  CLIENT_ADD_LINK_VIDEO,
  CLIENT_UPVOTE_VIDEO,
  CLIENT_DOWNVOTE_VIDEO,
  SERVER_CREATE_STATION_SUCCESS,
  SERVER_JOINED_STATION_SUCCESS,
  SERVER_NEW_USER_JOINED,
  SERVER_LEFT_STATION_SUCCESS,
  SERVER_USER_LEFT,
  SERVER_UPDATE_PLAYLIST,
} from '../lib/actions';

/* eslint-disable import/no-named-as-default-member */
export default (socket, io) => {
  // handle redux action
  socket.on('action', action => {
    switch (action.type) {
      case CLIENT_CREATE_STATION:
        _onCreateStation(
          io,
          socket,
          action.payload.stationName,
          action.payload.userId,
        );
        break;

      case CLIENT_JOIN_STATION:
        _onJoinStation(
          io,
          socket,
          action.payload.userId,
          action.payload.stationName,
        );
        break;

      case CLIENT_LEAVE_STATION:
        _onLeaveStation(
          io,
          socket,
          action.payload.userId,
          action.payload.stationName,
        );
        break;

      case CLIENT_ADD_LINK_VIDEO:
        _onAddLinkVideo(
          io,
          socket,
          action.payload.stationName,
          action.payload.songUrl,
          action.payload.userId,
        );
        break;

      case CLIENT_UPVOTE_VIDEO:
        _onClientUpvote(
          io,
          socket,
          action.payload.stationName,
          action.payload.videoId,
          action.payload.userId,
        );
        break;

      case CLIENT_DOWNVOTE_VIDEO:
        _onClientDownVote(
          io,
          socket,
          action.payload.stationName,
          action.payload.videoId,
          action.payload.userId,
        );
        break;
      default:
        break;
    }
  });
};

function _emit(socket, type, payload) {
  socket.emit('action', {
    type: type,
    payload: payload,
  });
}

function _emitStation(io, stationName, type, payload) {
  io.to(stationName).emit('action', {
    type: type,
    payload: payload,
  });
}

function _emitAll(io, type, payload) {
  io.emit('action', {
    type: type,
    payload: payload,
  });
}

function _onCreateStation(io, socket, stationName, userId) {
  // stationController.addStation(stationName, userId, (err, station) => {
  stationController.addStation(stationName, station => {
    _emit(socket, SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
    _emitAll(io, SERVER_CREATE_STATION_SUCCESS, {
      stations: [],
    });
  });
}

function _onJoinStation(io, socket, userId, stationName) {
  stationController.joinStation(userId, stationName, station => {
    // leave all stations then join to the new station
    socket.join(stationName);
    _emit(socket, SERVER_JOINED_STATION_SUCCESS, {
      station: station,
    });
    userController.getUserById(userId, user => {
      _emitStation(io, stationName, SERVER_NEW_USER_JOINED, {
        user: user,
      });
    });
  });
}

function _onLeaveStation(io, socket, userId, stationName) {
  stationController.leaveStation(userId, stationName, () => {
    // leave all stations then join to the new station
    socket.leave(stationName);
    _emit(socket, SERVER_LEFT_STATION_SUCCESS, {});
    userController.getUserById(userId, user => {
      _emitStation(io, stationName, SERVER_USER_LEFT, {
        user: user,
      });
    });
  });
}

function _onAddLinkVideo(io, socket, stationName, songUrl, userId) {
  // stationController.addSong(stationName, songUrl, userId, playlist => {
  stationController.addSong(stationName, songUrl, playlist => {
    _emitStation(io, stationName, SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  });
}

function _onClientUpvote(io, socket, stationName, videoId, userId) {
  stationController.upVoteVideo(stationName, videoId, userId, playlist => {
    _emitStation(io, stationName, SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  });
}

function _onClientDownVote(io, socket, stationName, videoId, userId) {
  stationController.downVoteVideo(stationName, videoId, userId, playlist => {
    _emitStation(io, stationName, SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  });
}
