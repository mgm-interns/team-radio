import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { registerServiceWorker } from './Config';
import App from './Container/App';
import { MuiTheme } from './Theme';
import './index.css';

//
ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

//
registerServiceWorker();
