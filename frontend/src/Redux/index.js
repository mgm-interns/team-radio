import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import { apiMiddleware } from 'redux-api-middleware';
import { webSocket } from 'Config';
import reducers from './reducers';

let store = null;
// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;

if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  process.env.NODE_ENV === 'development'
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const create = (initialState = {}) => {
  const socketIoMiddleware = createSocketIoMiddleware(webSocket, 'CLIENT:');

  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, apiMiddleware, socketIoMiddleware),
      devtools,
    ), // Compose redux dev tools
  );
};

export default function initRedux(initialState = {}) {
  if (!store) {
    store = create(initialState);
  }
  // Export store to be a global variable in development environment
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }
  return store;
}
