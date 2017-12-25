import stationController from '../Controllers/StationController';
import userController from '../Controllers/UserController';
import {
  SERVER_CREATE_STATION_SUCESS,
  SERVER_JOINED_STATION_SUCESS,
  SERVER_NEW_USER_JOINED,
  SERVER_UPDATE_PLAYLIST,
} from '../../../lib/actions';

/* eslint-disable import/no-named-as-default-member */
export default (socket, io) => {
  // handle redux action
  socket.on('action', action => {
    switch (action.type) {
      case 'CLIENT:CREATE_STATION':
        // stationController.addStation(
        //   action.payload.stationName,
        //   action.payload.userId,
        // );
        stationController.addStation(action.payload.stationName);
        socket.emit('action', {
          type: SERVER_CREATE_STATION_SUCESS,
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
          type: SERVER_JOINED_STATION_SUCESS,
          payload: {
            station: stationController.getStationById(action.payload.stationId),
          },
        });
        socket.broadcast.emit('action', {
          type: SERVER_NEW_USER_JOINED,
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
          type: SERVER_UPDATE_PLAYLIST,
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
          type: SERVER_UPDATE_PLAYLIST,
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
          type: SERVER_UPDATE_PLAYLIST,
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
