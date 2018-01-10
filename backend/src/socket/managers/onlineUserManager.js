import * as EVENTS from '../../const/actions';

export const countOnlineUserOfAllStations = async (stations, io) =>
  Promise.all(
    stations.map(async station => {
      const count = await countOnlineUserOfStation(station.station_id, io);
      return {
        station_id: station.station_id,
        online_count: count,
      };
    }),
  );

export const countOnlineUserOfStation = async (stationId, io) =>
  new Promise(resolve => {
    io
      .of('/')
      .in(stationId)
      .clients((error, clients) => {
        if (error) return resolve(0);
        return resolve(clients.length);
      });
  });

export const leaveNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineUserOfStation(stationId, io);
  emitter.emitToStation(stationId, EVENTS.SERVER_USER_LEFT, {
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
  const count = await countOnlineUserOfStation(stationId, io);
  emitter.emitToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
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
