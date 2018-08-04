import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'cropperjs/dist/cropper.css';
import { isElectronInstance } from 'Util/electron';
import HttpsRedirector from 'Container/HttpsRedirector';
import RadioRedirector from 'Container/RadioRedirector';
import { registerServiceWorker } from './Configuration';
import Container from './Container';
import { MuiTheme } from './Theme';
import './index.css';

//
ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <Container />
    <HttpsRedirector />
    <RadioRedirector />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

if (!isElectronInstance()) {
  registerServiceWorker();
}
