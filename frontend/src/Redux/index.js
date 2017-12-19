import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducers';

let store = null;

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;

/* eslint-disable */
if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  process.env.NODE_ENV === 'development'
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}
/* eslint-enable */

const create = (initialState = {}) =>
  createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk, apiMiddleware), devtools), // Compose redux devtools
  );

export default function initRedux(initialState = {}) {
  if (!store) {
    store = create(initialState);
  }
  return store;
}
