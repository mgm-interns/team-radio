import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';
import App from './Container/App';

import Theme from './Theme/';

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
