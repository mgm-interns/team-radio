import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import { initRedux } from '../Config';

const store = initRedux();

export default () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
