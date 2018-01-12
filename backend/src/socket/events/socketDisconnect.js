import * as onlineManager from '../managers/onlineUserManager';

export default async (io, socket) => {
  onlineManager.leaveAllStation(io, socket, socket.userId);
};
