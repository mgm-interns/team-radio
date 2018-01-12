import * as EVENTS from '../../const/actions';

export default (io, socket, action) => {
  switch (action.type) {
    case EVENTS.CLIENT_CREATE_STATION:
      console.log('Action received: ' + EVENTS.CLIENT_CREATE_STATION);
      break;
    default:
      break;
  }
};
