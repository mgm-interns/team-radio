import * as EVENTS from '../../const/actions';
import * as userController from '../../controllers/user';
import createEmitter from './createEmitter';
import skipDecider from './skipDecider';

export const leaveAllStation = async (io, socket, userId) => {
  // Get all stations that socket is in
  const allStations = Object.keys(socket.rooms).slice(1);
  const leaveStationPromises = [];

  try {
    const user = await userController.getUserById(userId);
    if (user.name) {
      const name = user.name;
      allStations.forEach(stationId => {
        leaveStationPromises.push(_leaveStation(io, socket, stationId, name));
      });
    } else if (user.username) {
      const name = user.username;
      allStations.forEach(stationId => {
        leaveStationPromises.push(_leaveStation(io, socket, stationId, name));
      });
    } else {
      const name = 'Someone';
      allStations.forEach(stationId => {
        leaveStationPromises.push(_leaveStation(io, socket, stationId, name));
      });
    }
  } catch (err) {
    allStations.forEach(stationId => {
      leaveStationPromises.push(
        _leaveStation(io, socket, stationId, 'Someone'),
      );
    });
  }
  Promise.all(leaveStationPromises);
};

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

// Get list userId are in station
export const getListUserIdOnline = async (stationId, io) => {
  const userList = [];
  const socketList = await getListSocketId(stationId, io);
  socketList.forEach(socketId => {
    const userId = io.sockets.connected[socketId].userId;
    if (userId && userId !== 0 && userId !== '0') {
      userList.push(userId);
    }
  });
  return new Set(userList); // make unique
};

export const getListUserOnline = async (stationId, io) => {
  // name, username, avatar_url
  const setUserId = await getListUserIdOnline(stationId, io);
  const list = [...setUserId];

  return Promise.all(
    list.map(async userId => {
      const user = await userController.getUserById(userId);
      return {
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url,
      };
    }),
  );
};

export const leaveNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  const users = await getListUserOnline(stationId, io);
  emitter.broadcastToStation(stationId, EVENTS.SERVER_USER_LEFT, {
    user: name,
  });
  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });
  emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
    station_id: stationId,
    online_count: count,
  });
};

export const joinNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  const users = await getListUserOnline(stationId, io);
  emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
    user: name,
  });
  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });
  emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
    station_id: stationId,
    online_count: count,
  });
};

const _leaveStation = (io, socket, stationId, name) => {
  const emitter = createEmitter(socket, io);
  return new Promise(resolve => {
    socket.leave(stationId, resolve);
    skipDecider(io, stationId);
    leaveNotification(stationId, name, emitter, io);
  });
};
