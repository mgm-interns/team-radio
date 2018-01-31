import * as onlineManager from '../managers/onlineUserManager';
import * as players from '../../players';

export default async stationId => {
  const player = await players.getPlayer(stationId);
  const listUserOnline = await onlineManager.getListUserIdOnline(stationId);
  // Let player decide what song will be skipped
  player.updateOnlineUsers(listUserOnline);
};
