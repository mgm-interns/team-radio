import * as onlineManager from '../managers/onlineUserManager';
import * as players from '../../players';

export default async (io, stationId) => {
  console.log('Skip decider for: ' + stationId);
  const player = await players.getPlayer(stationId);
  const listUserOnline = await onlineManager.getListUserIdOnline(stationId, io);
  player.updateOnlineUsers(listUserOnline);
};
