/* ***************************************************************************** */
// CLIENT REQUESTS
export const CLIENT_SEND_CHAT_MESSAGE = 'CLIENT:SEND_CHAT_MESSAGE';
// request payload { userId, stationId, message }

// SERVER RESPONSES
export const SERVER_SEND_CHAT_MESSAGE_SUCCESS =
  'SERVER:SEND_CHAT_MESSAGE_SUCCESS';
// response payload: { }

/* ***************************************************************************** */
// SERVER NOTIFY
export const SERVER_HAVE_NEW_MESSAGE = 'SERVER:HAVE_NEW_MESSAGE';
// response payload: { user, message }
