/**
 * Set up websocket
 */
/* eslint-disable */
const responeModel = require('./Models/ResponeModel');
const stationModel = require('./Models/Station');
const io = require('socket.io')();
const stationNsp = io.of('/station');
io.on('connection', function(socket) {
  console.log('#THANG: Socket connected: ' + socket.id);
});

stationNsp.on('connection', async function(socket) {
  socket.on('action', function(data) {
    switch (data.type) {
      case 'CLIENT:JOIN_STATION_REQUEST':
        joinStation(socket, data.payload);
        break;
      case 'CLIENT:ADD_SONG_REQUEST':
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
    var stationDetail = await stationModel.getStationByName2(stationUrl);

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
  }
}

async function addNewSong(socket, payload) {
  // Verify payload and ayload.song_url
  if (payload === undefined || (payload.song_url + '').length < 1) {
    socket.emit('action', responeModel('SERVER:ADD_SONG_FAILURE', payload));
  } else {
    var songUrl = payload.song_url + ''; // Make use that songUrl is a string
    // Only use the getStationByName2 at the moment => change to getStationByUrl
    var songDetail = await stationModel.addNewSong(
      songDetail,
      socket.stationId,
    );

    // Verify the station url
    if (songDetail == null) {
      // The station is not existed
      socket.emit('action', responeModel('SERVER:ADD_SONG_FAILURE', payload));
    } else {
      // Send the song detail to all clients in the station
      socket.emit('action', responeModel('SERVER:ADD_SONG', songDetail));
      socket.broadcast
        .to(socket.stationId)
        .emit('action', responeModel('SERVER:ADD_SONG', songDetail));
    }
  }
}
/*
nsp.on('connection', async function(socket) {
  console.log('someone connected');
  socket.send('Connected to station');
  socket.emit('join-room', 'Begin join room');

  // Client join room
  socket.on('join-station', async function(stationName) {
    socket.join(stationName);
    socket.send('Joined to station: ' + stationName);
    socket.stationName = stationName;

    // Get paylist
    console.log(socket.rooms);
    var stationInfor = await stationModel.getStationByName2(stationName);
    if (stationInfor === null) {
      // Send message warns the join is fail
      socket.emit('join-station-failure', stationName);
      // Close the socket [Not done]
    }else{
      // Send the station information to the client
      console.log(stationInfor);
      socket.emit('play-list', stationInfor);
    }
  });

  // Client add new song
  socket.on('add-new-song', function(songUrl) {
    // Add song to the database
    // Send message to all clients on the room
    console.log('socket.stationName: ' + socket.stationName);
    // The orther way: io.sockets.emit('add-new-song', songUrl);
    socket.broadcast.to(socket.stationName).emit('add-new-song', songUrl);
    socket.emit('add-new-song', songUrl);
  });
});
*/
export default io;
