import createEmitter from '../managers/createEmitter';
import * as stationController from '../../controllers/station';
import * as onlineManager from '../managers/onlineUserManager';
import * as EVENTS from '../../const/actions';

export default (io, socket) => {
  updateStationList(io, socket);
};

const updateStationList = async (io, socket) => {
  const emitter = createEmitter(socket, io);
  try {
    const allStations = await stationController.getAllAvailableStations();
    const allOnlineUser = await onlineManager.countOnlineUserOfAllStations(
      allStations,
      io,
    );
    emitter.emit(EVENTS.SERVER_UPDATE_STATIONS, {
      stations: mergeOnlineCountToStation(allStations, allOnlineUser),
    });
  } catch (err) {
    console.log(EVENTS.SERVER_UPDATE_STATIONS + ' fail! Error: ' + err);
  }
};

const mergeOnlineCountToStation = (allStations, allOnlineUser) =>
  allStations.map((station, index) => {
    const { online_count } = allOnlineUser[index];
    return {
      ...station,
      online_count,
    };
  });
