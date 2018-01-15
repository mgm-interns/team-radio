import * as onlineManager from '../managers/onlineUserManager';

export default (io, socket) => {
  onlineManager.leaveAllStation(io, socket, socket.userId);
};
