import {
  CLIENT_CREATE_STATION,
  CLIENT_LOAD_STATION_PAGING,
} from 'Redux/actions';

export const createStation = ({
  stationName,
  userId = '0',
  isPrivate = false,
}) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName: stationName.toString(), userId, isPrivate },
});

export const loadStationPaging = () => ({
  type: CLIENT_LOAD_STATION_PAGING,
});

export default {
  createStation,
};
