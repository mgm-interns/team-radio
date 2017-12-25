import io from 'socket.io-client';

let webSocketEndPoint = process.env.REACT_APP_WEBSOCKET_END_POINT;

if (process.env.NODE_ENV === 'production') {
  webSocketEndPoint = window.location.host;
}

export default io(webSocketEndPoint);
