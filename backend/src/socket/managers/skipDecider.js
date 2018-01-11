import * as onlineManager from '../managers/onlineUserManager';
import * as players from '../../players';

export default async (io, stationId) => {
  const player = await players.getPlayer(stationId);
  const listUserOnline = await onlineManager.getListUserOnline(stationId, io);
  player.updateOnlineUsers(listUserOnline);
};
