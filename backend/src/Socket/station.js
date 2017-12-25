import stationController from '../Controllers/StationController';
import userController from '../Controllers/UserController';

/* eslint-disable import/no-named-as-default-member */
export default (socket, io) => {
  // auto emit new data to client
  setInterval(() => {
    io.sockets.emit('action', {
      type: 'SERVER:UPDATE_NOW_PLAYING',
      payload: {
        playlist: [],
      },
    });
  }, 60000); // setInterval match song duration

  // handle redux action
  socket.on('action', action => {
    switch (action.type) {
      case 'CLIENT:CREATE_STATION':
        stationController.addStation(
          action.payload.stationName,
          action.payload.userId,
        );
        socket.emit('action', {
          type: 'SERVER:CREATE_STATION_SUCESS',
          payload: {
            station: stationController.getStationByName(
              action.payload.stationName,
            ),
          },
        });
        break;

      case 'CLIENT:JOIN_STATION':
        stationController.joinStation(
          action.payload.userId,
          action.payload.stationId,
        );
        socket.emit('action', {
          type: 'SERVER:JOINED_STATION',
          payload: {
            station: stationController.getStationById(action.payload.stationId),
          },
        });
        socket.broadcast.emit('action', {
          type: 'SERVER:NEW_USER_JOINED',
          payload: {
            user: userController.getUserById(action.payload.userId),
          },
        });
        break;

      case 'CLIENT:ADD_LINK_VIDEO':
        stationController.addVideo(
          action.payload.stationId,
          action.payload.videoUrl,
          action.payload.userId,
        );
        io.sockets.emit('action', {
          type: 'SERVER:UPDATE_PLAYLIST',
          payload: {
            playlist: stationController.getPlaylist(action.payload.stationId),
          },
        });
        break;

      case 'CLIENT:UPVOTE_VIDEO':
        stationController.upVoteVideo(
          action.payload.stationId,
          action.payload.videoId,
          action.payload.userId,
        );
        io.sockets.emit('action', {
          type: 'SERVER:UPDATE_PLAYLIST',
          payload: {
            playlist: stationController.getPlaylist(action.payload.stationId),
          },
        });
        break;

      case 'CLIENT:UN_UPVOTE_VIDEO':
        stationController.unUpVoteVideo(
          action.payload.stationId,
          action.payload.videoId,
          action.payload.userId,
        );
        io.sockets.emit('action', {
          type: 'SERVER:UPDATE_PLAYLIST',
          payload: {
            playlist: stationController.getPlaylist(action.payload.stationId),
          },
        });
        break;
      default:
        break;
    }
  });
};
