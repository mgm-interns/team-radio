import * as EVENTS from '../../const/actions';
import * as userController from '../../controllers/user';
import * as stationController from '../../controllers/station';
import createEmitter from './createEmitter';
import skipDecider from './skipDecider';

export const getSocketById = (socketId, io) => io.sockets.connected[socketId];

// Get all socket connected to app
export const getAllSocketConnected = io =>
  new Promise(resolve => {
    io.of('/').clients((error, clients) => {
      if (error) return resolve([]);
      return resolve(clients);
    });
  });

// Get all station socket is in
export const getAllStationsSocketIn = socket =>
  Object.keys(socket.rooms).slice(1);

// Get list of all socketId in station
export const getListSocketIdInStation = async (stationId, io) =>
  new Promise(resolve => {
    io
      .of('/')
      .in(stationId)
      .clients((error, clients) => {
        if (error) return resolve([]);
        return resolve(clients);
      });
  });

// Return number of online users in station
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

/**
 * Count number of online users for the stations
 * with each station, return an object include: station_id, online_count
 * @param {array} stations: list of station want to count number of online users
 * @param {*} io
 */
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

/**
 * This function allows socket to leave all the stations it is in
 * With each station, it will send a leave notification
 */
export const leaveAllStation = async (io, socket, userId) => {
  // Get all stations that socket is in
  const allStations = getAllStationsSocketIn(socket);
  const leaveStationPromises = [];

  try {
    const user = await userController.getUserById(userId);
    if (user.name) {
      const name = user.name;
      allStations.forEach(stationId => {
        leaveStationPromises.push(
          _leaveStation(io, socket, stationId, userId, name),
        );
      });
    } else if (user.username) {
      const name = user.username;
      allStations.forEach(stationId => {
        leaveStationPromises.push(
          _leaveStation(io, socket, stationId, userId, name),
        );
      });
    } else {
      const name = 'Someone';
      allStations.forEach(stationId => {
        leaveStationPromises.push(
          _leaveStation(io, socket, stationId, userId, name),
        );
      });
    }
  } catch (err) {
    allStations.forEach(stationId => {
      leaveStationPromises.push(
        _leaveStation(io, socket, stationId, '0', 'Someone'),
      );
    });
  }
  Promise.all(leaveStationPromises);
};

// Get list userId are in station
export const getListUserIdOnline = async (stationId, io) => {
  const userList = new Set(); // Use set to make userList unique
  const socketList = await getListSocketIdInStation(stationId, io);

  socketList.forEach(socketId => {
    const socket = getSocketById(socketId, io);
    const userId = socket.userId;
    if (userId && userId !== '0') {
      userList.add(userId);
    }
  });

  return userList;
};

export const getListUserOnline = async (stationId, io) => {
  // name, username, avatar_url
  const setOfUserId = await getListUserIdOnline(stationId, io);
  const list = [...setOfUserId];

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

export const userAlreadyInRoom = async (stationId, userId, io) => {
  // Get list of online user in station
  const list = await getListUserIdOnline(stationId, io);
  return list.has(userId);
};

export const getStationUserAlreadyIn = async (userId, socket, io) => {
  // Get all sockets have connected with Server
  const socketList = await getAllSocketConnected(io);
  let stationUserIn;

  socketList.forEach(tmpSocketId => {
    if (socket.id !== tmpSocketId) {
      const tmpSocket = getSocketById(tmpSocketId, io);
      if (tmpSocket.userId === userId) {
        const stationSocketIn = getAllStationsSocketIn(tmpSocket)[0];
        if (stationSocketIn) {
          stationUserIn = stationSocketIn;
          return false;
        }
      }
    }
  });

  return stationUserIn;
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

  const station = await stationController.getStation(stationId);
  if (!station.is_private) {
    emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
      station_id: stationId,
      online_count: count,
    });
  }
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

  const station = await stationController.getStation(stationId);
  if (!station.is_private) {
    emitter.emitAll(EVENTS.SERVER_STATION_CHANGE_ONLINE_USERS, {
      station_id: stationId,
      online_count: count,
    });
  }
};

const _leaveStation = (io, socket, stationId, userId, name) => {
  const emitter = createEmitter(socket, io);
  return new Promise(async resolve => {
    socket.leave(stationId, resolve);
    const alredyInRoom = await userAlreadyInRoom(stationId, userId, io);
    if (!alredyInRoom) {
      skipDecider(io, stationId);
      leaveNotification(stationId, name, emitter, io);
    }
  });
};
