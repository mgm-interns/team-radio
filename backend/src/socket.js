/**
 * Set up websocket
 */
/* eslint-disable */
const responeModel = require('./Models/ResponeModel');
const stationController = require('./Controllers/StationController');
const io = require('socket.io')();
const stationNsp = io.of('/station');

stationNsp.on('connection', async function(socket) {
  socketHandlers.map(handler => handler(socket, io));
  socket.on('action', function(data) {
    switch (data.type) {
      // Client join to a station
      case 'CLIENT:JOIN_STATION_REQUEST':
        joinStation(socket, data.payload);
        break;
      // The station owner add a song to the playlist
      case 'CLIENT:ADD_SONG_REQUEST':
        addNewSong(socket, data.payload);
        break;
      // The station owner delete a song from the playlist
      case 'CLIENT:DELETE_SONG_REQUEST':
        addNewSong(socket, data.payload);
        break;
      // The station owner delete a song from the playlist
      case 'CLIENT:UPVOTE_REQUEST':
        addNewSong(socket, data.payload);
        break;
      // The station owner delete a song from the playlist
      case 'CLIENT:DOWNVOTE_REQUEST':
        addNewSong(socket, data.payload);
        break;

      default:
        console.log(data);
    }
  });
});

async function joinStation(socket, payload) {
  // Verify payload and ayload.station_url
  if (payload === undefined || (payload.station_url + '').length < 1) {
    socket.emit('action', responeModel('SERVER:JOIN_STATION_FAILURE', payload));
  } else {
    var stationUrl = payload.station_url + ''; // Make use that stationUrl is a string
    // Only use the getStationByName2 at the moment => change to getStationByUrl
    stationController.getStationByUrl(stationUrl, function(stationDetail) {
      // Verify the station url
      if (stationDetail == null) {
        // The station is not existed
        socket.emit(
          'action',
          responeModel('SERVER:JOIN_STATION_FAILURE', payload),
        );
      } else {
        // Send the station detail
        socket.emit(
          'action',
          responeModel('SERVER:STATION_DETAIL', stationDetail),
        );
        // Set station id for the client socket
        socket.stationId = stationDetail._id;
        // Client join to the station
        socket.join(socket.stationId);
        // Warn to orther clients if it is necssesary
      }
    });
  }
}

async function addNewSong(socket, payload) {
  // Verify payload and ayload.song_url
  if (payload === undefined || (payload.song_url + '').length < 1) {
    socket.emit('action', responeModel('SERVER:ADD_SONG_FAILURE', payload));
  } else {
    var songUrl = payload.song_url + ''; // Make use that songUrl is a string
    stationController.addSong(socket.stationId, songUrl, function(songDetail) {
      if (songDetail == null) {
        socket.emit('action', responeModel('SERVER:ADD_SONG_FAILURE', payload));
      } else {
        // Send the song detail to all clients in the station
        socket.emit(
          'action',
          responeModel('SERVER:ADD_SONG_SUCCESS', songDetail),
        );
        socket.broadcast
          .to(socket.stationId)
          .emit('action', responeModel('SERVER:ADD_SONG_SUCCESS', songDetail));
      }
    });
  }
}
export default io;
