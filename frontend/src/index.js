import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { registerServiceWorker } from './Config';
import App from './Container/App';
import { MuiTheme } from './Theme';
import './index.css';

//
ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

//
registerServiceWorker();
