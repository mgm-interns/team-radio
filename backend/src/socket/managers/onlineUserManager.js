export const countOnlineUserOfAllStations = async (stations, io) =>
  Promise.all(
    stations.map(async station => {
      const count = await countOnlineUserOfStation(station.id, io);
      return {
        stationId: station.id,
        onlineCount: count,
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
