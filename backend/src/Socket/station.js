import Station from '../Models/Station';
import {
  getNowplaying,
  nextNowplaying,
  getPlaylist,
  upVoteVideo,
  unUpVoteVideo,
} from '../../fixture/station';

let nowplaying = getNowplaying();

/* eslint-disable import/no-named-as-default-member */
export default (socket, io) => {
  // auto emit new data to client
  setInterval(() => {
    nowplaying = nextNowplaying();
    // Emit action
    socket.emit('action', {
      type: 'SERVER:UPDATE_STATION',
      payload: {
        playlist: getPlaylist(),
        nowplaying: nowplaying,
      },
    });
  }, nowplaying.duration); // setInterval match song duration

  // handle redux action
  socket.on('action', action => {
    switch (action.type) {
      case 'CLIENT:JOIN_STATION':
        // Query station by name
        Station.getStationByName(action.payload.stationName, (err, station) => {
          // Emit action
          socket.emit('action', {
            type: 'SERVER:JOINED_STATION',
            payload: {
              station: station,
              playlist: getPlaylist(),
              nowplaying: nowplaying,
            },
          });
        });
        break;
      case 'CLIENT:UPVOTE_VIDEO':
        // Params: videoID, stationID, userID
        // Upvote and return new playlist
        upVoteVideo(action.payload.videoId);
        io.sockets.emit('action', {
          type: 'SERVER:UPDATE_STATION',
          payload: {
            playlist: getPlaylist(),
            nowplaying: nowplaying,
          },
        });
        break;
      case 'CLIENT:UN_UPVOTE_VIDEO':
        // Params: videoID, stationID, userID
        // Un upvote and return new playlist
        unUpVoteVideo(action.payload.videoId);
        io.sockets.emit('action', {
          type: 'SERVER:UPDATE_STATION',
          payload: {
            playlist: getPlaylist(),
            nowplaying: nowplaying,
          },
        });
        break;
      default:
        break;
    }
  });
};
