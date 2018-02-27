import { CLIENT_CREATE_STATION } from 'Redux/actions';
import { CLIENT_UPDATE_STATION_OWNER } from 'Redux/actions';

export const createStation = ({
  stationName,
  userId = '0',
  isPrivate = false,
}) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName: stationName.toString(), userId, isPrivate },
});

export const updateStationOwner = ({
  stationName,
  userId
}) => ({
  type: CLIENT_UPDATE_STATION_OWNER,
  payload: { stationName: stationName.toString(), userId }
});

export default {
  createStation,
  updateStationOwner
};
