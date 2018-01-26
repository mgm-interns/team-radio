import { RSAA } from 'redux-api-middleware';

export default action => ({
  [RSAA]: {
    ...action[RSAA],
    headers: {
      ...action[RSAA].headers,
      'access-token': localStorage.getItem('token'),
    },
  },
});
