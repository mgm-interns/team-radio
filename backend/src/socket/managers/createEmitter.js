export default (socket, io) => ({
  emit: (eventName, payload) => {
    // Emit to sender
    socket.emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  emitToStation: (stationId, eventName, payload) => {
    // Emit to every person in station
    io.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  emitToUser: (userId, eventName, payload) => {
    io.to(userId).emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  broadcastToStation: (stationId, eventName, payload) => {
    // Broadcast to every person in station except sender
    socket.broadcast.to(stationId).emit('action', {
      type: eventName,
      payload: payload,
    });
  },
  emitAll: (eventName, payload) => {
    // Emit to every person who is using web socket
    io.emit('action', {
      type: eventName,
      payload: payload,
    });
  },
});
