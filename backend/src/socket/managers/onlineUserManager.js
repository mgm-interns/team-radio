import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';
import * as userController from '../../controllers/user';
import * as switcher from '../../switcher';
import createEmitter from './createEmitter';
import skipDecider from './skipDecider';

let io = null;

export const attachSocketIO = _io => {
  io = _io;
};

export const getSocketById = socketId => io.sockets.connected[socketId];

// Get all socket connected to app
export const getAllSocketConnected = () =>
  new Promise(resolve => {
    io.of('/').clients((error, clients) => {
      if (error) return resolve([]);
      return resolve(clients);
    });
  });

// Get list of all sockets has created by user
export const getAllSocketsOfUser = async userId => {
  const allSockets = await getAllSocketConnected();
  const socketsOfUser = [];

  allSockets.forEach(socketId => {
    const socket = getSocketById(socketId);
    if (socket.userId === userId) {
      socketsOfUser.push(socket);
    }
  });

  return socketsOfUser;
};

// Get all stations socket is in
export const getAllStationsSocketIn = socket =>
  Object.keys(socket.rooms).slice(1);

// Get list of all socketId in station
export const getListSocketIdInStation = async stationId =>
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
export const countOnlineOfStation = async stationId => {
  // Get number of logged in users
  const users = (await getListUserIdOnline(stationId)).size;

  // Get number of not logged in users
  let anonymous = 0;
  const listSocket = await getListSocketIdInStation(stationId);
  listSocket.forEach(socketId => {
    const socket = getSocketById(socketId);
    if (!socket.userId || socket.userId === CONSTANTS.ANONYMOUS_ID) {
      anonymous += 1;
    }
  });

  return users + anonymous;
};

/**
 * Count number of online users for the stations
 * with each station, return an object include: station_id, online_count
 * @returns array [ { station_id, online_count } ]
 */
export const countOnlineOfAllStations = async stations =>
  Promise.all(
    stations.map(async station => {
      const count = await countOnlineOfStation(station.station_id);
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
  socket,
) => {
  // Get list of all sockets has created by user
  const listSocket = await getAllSocketsOfUser(userId);

  listSocket.forEach(_socket => {
    const oldStation = getAllStationsSocketIn(_socket)[0];
    if (
      oldStation &&
      socket.id !== _socket.id &&
      oldStation.toString() !== stationId.toString()
    ) {
      const emitter = createEmitter(_socket, io);
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
export const leaveAllStation = async (socket, userId) => {
  // Get all stations that socket is in
  const allStations = getAllStationsSocketIn(socket);
  const leaveStationPromises = [];

  try {
    const user = await userController.getUserById(userId);
    if (!user) throw new Error();
    allStations.forEach(stationId => {
      leaveStationPromises.push(
        _leaveStation(
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
export const getListUserIdOnline = async stationId => {
  const userList = new Set(); // Use set to make userList unique
  const socketList = await getListSocketIdInStation(stationId);

  socketList.forEach(socketId => {
    const socket = getSocketById(socketId);
    const userId = socket.userId;
    if (userId && userId !== CONSTANTS.ANONYMOUS_ID) {
      userList.add(userId);
    }
  });

  return userList;
};

/**
 * Get list users online, include: user_id, name, username, avatar_url
 * @returns array [ { user_id, name, username, avatar_url } ]
 */
export const getListUserOnline = async stationId => {
  const setOfUserId = await getListUserIdOnline(stationId);
  const listUsersIdOnline = [...setOfUserId]; // Convert set to array

  return Promise.all(
    listUsersIdOnline.map(async userId => {
      const user = await userController.getUserById(userId);
      return {
        user_id: user._id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url,
      };
    }),
  );
};

// Check if user already in station
export const userAlreadyInRoom = async (stationId, userId) => {
  // Get list of online user in station
  const listUsersIdOnline = await getListUserIdOnline(stationId);
  return listUsersIdOnline.has(userId);
};

/**
 * This function will notify all peoples in station that an user has left
 * @param stationId ID of station you want to notify
 * @param name Name of user just joined
 */
export const leaveNotification = async (stationId, name, emitter) => {
  const count = await countOnlineOfStation(stationId);
  const users = await getListUserOnline(stationId);

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
 */
export const joinNotification = async (stationId, name, emitter) => {
  const count = await countOnlineOfStation(stationId);
  const users = await getListUserOnline(stationId);

  emitter.broadcastToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
    user: name,
  });

  emitter.broadcastToStation(stationId, EVENTS.SERVER_UPDATE_ONLINE_USERS, {
    online_count: count,
    users: users,
  });
};

const _leaveStation = (socket, stationId, userId, name) => {
  const emitter = createEmitter(socket, io);
  return new Promise(async resolve => {
    socket.leave(stationId, resolve);
    switcher.updateNumberOfOnlineUsersInStation(
      stationId,
      await countOnlineOfStation(stationId),
    );
    const alredyInRoom = await userAlreadyInRoom(stationId, userId);
    if (!alredyInRoom) {
      skipDecider(stationId);
      leaveNotification(stationId, name, emitter);
    }
  });
};
