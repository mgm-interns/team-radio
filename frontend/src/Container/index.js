import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { initRedux } from '../Configuration';
import App from './App';

const store = initRedux();

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default AppContainer;
