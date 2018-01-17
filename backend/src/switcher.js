import _ from 'lodash';
import * as stationController from './controllers/station';
import * as EVENTS from './const/actions';
import * as players from './players';
// import io from './socket';

const NEW_STATION_TIME = 3600000; // an hour
const MAX_NUM_OF_STATION = 10;
const popularStationIds = [];
const onlineUsersInStations = [];
let stations = [];
let io = null;

export const getPopularStations = () => stations;


export const updateNumberOfOnlineUsersInStation = (stationId, numberOfUser) => {
  // TODO: make high performance
  if (
    true ||
    !onlineUsersInStations[stationId] ||
    (popularStationIds.has(stationId) &&
      numberOfUser < onlineUsersInStations[stationId]) ||
    (!popularStationIds.has(stationId) &&
      numberOfUser > onlineUsersInStations[stationId])
  ) {
    onlineUsersInStations[stationId] = numberOfUser;
    checkUpdatePopularStations();
  } else {
    onlineUsersInStations[stationId] = numberOfUser;
  }
}

export const attachWebSocket = _io => {
  io = _io;
  checkUpdatePopularStations();
};

export const checkUpdatePopularStations = async () => {
  stations = await stationController.getAllAvailableStations();
  const currentTime = Date.now();

  stations.forEach(station => {
    station.online_count = onlineUsersInStations[station.station_id]
      ? onlineUsersInStations[station.station_id]
      : 0;
    station.added_duration =
      currentTime - station.created_date <= NEW_STATION_TIME
        ? currentTime - station.created_date
        : -1;
  });
  const newStationsWithActiveUsers = _.filter(
    stations,
    station => station.added_duration > 0 && station.online_count > 0,
  );
  const oldStations = _.differenceWith(
    stations,
    newStationsWithActiveUsers,
    _.isEqual,
  );
  let activeStations = _.filter(
    oldStations,
    station => station.thumbnail !== '',
  );
  let inactiveStations = _.filter(
    oldStations,
    station => !station.thumbnail,
  );
  activeStations = _.orderBy(activeStations, ['online_count'], ['desc']);
  inactiveStations = _.orderBy(inactiveStations, ['online_count'], ['desc']);
  stations = newStationsWithActiveUsers.concat(activeStations);
  stations = stations.concat(inactiveStations);
  _emitPopularStations();
}

function _emitPopularStations() {
  _emit(EVENTS.SERVER_UPDATE_STATIONS, { stations: stations });
}

function _emit(eventName, payload) {
  io.emit('action', {
    type: eventName,
    payload: payload,
  });

};