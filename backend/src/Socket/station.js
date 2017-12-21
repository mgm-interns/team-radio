import Station from '../Models/Station';
import { getNowplaying, nextNowplaying, playlist } from '../../fixture/station';

let nowplaying = getNowplaying();

/* eslint-disable import/no-named-as-default-member */
export default socket => {
  // auto emit new data to client per 200s
  setInterval(() => {
    nowplaying = nextNowplaying();
    // Emit action
    socket.emit('action', {
      type: 'SERVER:UPDATE_STATION',
      payload: {
        playlist: playlist,
        nowplaying: nowplaying,
      },
    });
  }, 50000);

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
              playlist: playlist,
              nowplaying: nowplaying,
            },
          });
        });
        break;
      default:
        break;
    }
  });
};
