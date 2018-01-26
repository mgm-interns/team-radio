export default (socket, io) => ({
  emit: (eventName, payload) => {
    socket.emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  emitToStation: (stationId, eventName, payload) => {
    io.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  broadcastToStation: (stationId, eventName, payload) => {
    // Use broadcast to emit room except sender
    socket.broadcast.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  emitAll: (eventName, payload) => {
    io.emit('action', {
      type: eventName,
      payload: payload,
    });
  },
});
