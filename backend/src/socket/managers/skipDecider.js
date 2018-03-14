import * as onlineManager from '../managers/onlineUserManager';
import * as stationController from '../../controllers/station';
import * as players from '../../players';

export default async (userId, stationId) => {
  const station = await stationController.getStation(stationId);
  if (station.skip_by_station_owner) {
      _skipByStationOwner(station.owner_id, stationId);
  } else {
    _skipByUsers(stationId);
  }
};

const _skipByStationOwner = async (ownerId, stationId) => {
  const player = await players.getPlayer(stationId);
  player.skipSongByStationOwner(ownerId);
}

const _skipByUsers = async stationId => {
  const player = await players.getPlayer(stationId);
  const listUserOnline = await onlineManager.getListUserIdOnline(stationId);

  // Let player decide what song will be skipped
  player.updateOnlineUsers(listUserOnline);

}
