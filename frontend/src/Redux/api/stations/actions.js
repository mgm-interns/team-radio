import { CLIENT_CREATE_STATION } from 'Redux/actions';

export const createStation = ({ stationName, userId = '0' }) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName, userId },
});

export default {
  createStation,
};
