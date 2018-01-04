import { CLIENT_CREATE_STATION } from 'Redux/actions';

export const createStation = ({ userId = '0', stationName }) => ({
  type: CLIENT_CREATE_STATION,
  payload: { userId, stationName },
});

export default {
  createStation,
};
