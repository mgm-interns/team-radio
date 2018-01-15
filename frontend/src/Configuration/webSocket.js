import io from 'socket.io-client';

const IO_CONFIG = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
};

let webSocketEndPoint = process.env.REACT_APP_WEBSOCKET_END_POINT;

if (process.env.NODE_ENV === 'production') {
  webSocketEndPoint = window.location.host;
}

export default io(webSocketEndPoint, IO_CONFIG);
