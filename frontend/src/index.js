import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'cropperjs/dist/cropper.css';
import { registerServiceWorker } from './Config';
import AppContainer from './Container/AppContainer';
import { MuiTheme } from './Theme';
import './index.css';

//
ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <AppContainer />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

//
registerServiceWorker();
