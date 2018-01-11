import * as EVENTS from '../../const/actions';

export const countOnlineOfAllStations = async (stations, io) =>
  Promise.all(
    stations.map(async station => {
      const count = await countOnlineOfStation(station.station_id, io);
      return {
        station_id: station.station_id,
        online_count: count,
      };
    }),
  );

export const countOnlineOfStation = async (stationId, io) =>
  new Promise(resolve => {
    io
      .of('/')
      .in(stationId)
      .clients((error, clients) => {
        if (error) return resolve(0);
        return resolve(clients.length);
      });
  });

// Get list of all socketId in station
export const getListSocketId = async (stationId, io) =>
  new Promise(resolve => {
    io
      .of('/')
      .in(stationId)
      .clients((error, clients) => {
        if (error) return resolve([]);
        return resolve(clients);
      });
  });

export const getListUserOnline = async (stationId, io) => {
  const userList = [];
  const socketList = await getListSocketId(stationId, io);
  socketList.forEach(async socketId => {
    const userId = io.sockets.connected[socketId].userId;
    if (userId) {
      userList.push(userId);
    }
  });
  return new Set(userList); // make unique
};

export const leaveNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  emitter.broadcastToStation(stationId, EVENTS.SERVER_USER_LEFT, {
    user: name,
  });
  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
  });
  emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
    station_id: stationId,
    online_count: count,
  });
};

export const joinNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
    user: name,
  });
  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
  });
  emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
    station_id: stationId,
    online_count: count,
  });
};
