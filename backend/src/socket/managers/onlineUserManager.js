import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';
import * as userController from '../../controllers/user';
import * as switcher from '../../switcher';
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
export const countOnlineOfStation = async (stationId, io) => {
  // Get number of user logged in
  const users = (await getListUserIdOnline(stationId, io)).size;

  // Get number of anonymous
  let anonymous = 0;
  const listSocket = await getListSocketIdInStation(stationId, io);
  listSocket.forEach(socketId => {
    const socket = getSocketById(socketId, io);
    if (!socket.userId || socket.userId === '0') {
      anonymous += 1;
    }
  });

  return users + anonymous;
};

/**
 * Count number of online users for the stations
 * with each station, return an object include: station_id, online_count
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
 * An user cannot listening on multi station at a time
 * => Force any other tabs or browser redirect to most recent station
 */
export const leaveStationAlreadyIn = async (
  userId,
  stationId,
  stationName,
  io,
) => {
  const listSocket = await getAllSocketConnected(io);

  listSocket.forEach(socketId => {
    const socket = getSocketById(socketId, io);
    const oldStation = getAllStationsSocketIn(socket)[0];
    if (socket.userId === userId && oldStation !== stationId) {
      const emitter = createEmitter(socket, io);
      emitter.emit(EVENTS.SERVER_NO_MULTI_STATIONS, {
        stationId: stationId,
        stationName: stationName,
      });
    }
  });
};

/**
 * This function allows socket to leave all the stations it is in
 * With each station, it will send leave notification
 * @param {string} userId
 */
export const leaveAllStation = async (io, socket, userId) => {
  // Get all stations that socket is in
  const allStations = getAllStationsSocketIn(socket);
  const leaveStationPromises = [];

  try {
    const user = await userController.getUserById(userId);
    if (!user) throw new Error();
    allStations.forEach(stationId => {
      leaveStationPromises.push(
        _leaveStation(
          io,
          socket,
          stationId,
          userId,
          user.name || user.username || CONSTANTS.ANONYMOUS_NAME,
        ),
      );
    });
  } catch (err) {
    allStations.forEach(stationId => {
      leaveStationPromises.push(
        _leaveStation(
          io,
          socket,
          stationId,
          CONSTANTS.ANONYMOUS_ID,
          CONSTANTS.ANONYMOUS_NAME,
        ),
      );
    });
  }
  Promise.all(leaveStationPromises);
};

// Get list userIds are online in station
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

// Get list users online, include: name, username, avatar_url
export const getListUserOnline = async (stationId, io) => {
  const setOfUserId = await getListUserIdOnline(stationId, io);
  const list = [...setOfUserId]; // Convert set to array

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

// Check if user already in station
export const userAlreadyInRoom = async (stationId, userId, io) => {
  // Get list of online user in station
  const list = await getListUserIdOnline(stationId, io);
  return list.has(userId);
};

// Get station user is in
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
          return false; // break forEach loop
        }
      }
    }
  });

  return stationUserIn;
};

/**
 * This function will notify all peoples in station that an user has left
 * @param stationId ID of station you want to notify
 * @param name Name of user just joined
 * @param emitter Use for Emit notify
 * @param io
 */
export const leaveNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  const users = await getListUserOnline(stationId, io);

  emitter.broadcastToStation(stationId, EVENTS.SERVER_USER_LEFT, {
    user: name,
  });

  emitter.broadcastToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });
};

/**
 * This function will notify all peoples in station that an user has joined
 * @param {String} stationId ID of station you want to notify
 * @param {String} name Name of user just joined
 * @param {Any} emitter Use for Emit notify
 * @param {Any} io
 */
export const joinNotification = async (stationId, name, emitter, io) => {
  const count = await countOnlineOfStation(stationId, io);
  const users = await getListUserOnline(stationId, io);

  emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
    user: name,
  });

  emitter.broadcastToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });
};

const _leaveStation = (io, socket, stationId, userId, name) => {
  const emitter = createEmitter(socket, io);
  return new Promise(async resolve => {
    socket.leave(stationId, resolve);
    socket.userId = undefined;
    switcher.updateNumberOfOnlineUsersInStation(
      stationId,
      await countOnlineOfStation(stationId, io),
    );
    const alredyInRoom = await userAlreadyInRoom(stationId, userId, io);
    if (!alredyInRoom) {
      skipDecider(io, stationId);
      leaveNotification(stationId, name, emitter, io);
    }
  });
};
