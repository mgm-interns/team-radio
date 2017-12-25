/**
 * Set up websocket
 */
const stationModel = require('./Models/Station');
const io = require('socket.io')();
const nsp = io.of('/station');
io.on('connection', function(socket) {
  console.log('#THANG: Socket connected: ' + socket.id);
});

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
    } else {
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
export default io;
