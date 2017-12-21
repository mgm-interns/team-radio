import socketHandlers from './Socket/index';
/**
 * Set up websocket
 */
const io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('Socket connected: ' + socket.id);

  // Declare socket handler here
  socketHandlers.map(handler => handler(socket));
});

export default io;
