import HttpRequest from 'Util/redux/HttpRequest';
import { combineReducers } from 'redux';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const setSkipRuleRequest = new HttpRequest({
  method: 'PUT',
  type: 'SET_SKIP_RULE_BY_OWNER',
  endpoint: `${ENDPOINT}/stations/settings/update-skip-rule`,
  headers: {
    'access-token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

export const setSkipRule = setSkipRuleRequest.getAction();

export default combineReducers({
  skipRule: setSkipRuleRequest.getReducer(),
});
