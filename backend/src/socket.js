import socketHandlers from './Socket/index';
/**
 * Set up websocket
 */
const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('Socket connected: ' + socket.id);
  socketHandlers.map(handler => handler(socket, io));
});

export default io;
