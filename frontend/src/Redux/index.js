import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
// import * as reducers from './ducks';

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
    combineReducers({
      // ...reducers,
      form: formReducer, // Initialize redux form
    }),
    initialState,
    compose(applyMiddleware(thunk), devtools), // Compose redux devtools
  );

export default function initRedux(initialState = {}) {
  if (!store) {
    store = create(initialState);
  }
  return store;
}
