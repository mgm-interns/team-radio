import * as onlineManager from '../managers/onlineUserManager';

export default async (io, socket, userId) => {
  onlineManager.leaveAllStation(io, socket, userId);
};
