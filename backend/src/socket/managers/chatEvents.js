import * as EVENTS from '../../const/chatActions';

export default (io, socket, action) => {
  switch (action.type) {
    case EVENTS.CLIENT_SEND_CHAT_MESSAGE:
      console.log('Action received: ' + EVENTS.CLIENT_SEND_CHAT_MESSAGE);
      break;
    default:
      break;
  }
};
