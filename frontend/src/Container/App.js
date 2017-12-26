import React from 'react';
import { Provider } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Notification } from 'Component';
import Router from './Router';
import { initRedux } from '../Config';
import styles from './styles';

const store = initRedux();

export default withStyles(styles)(({ classes }) => (
  <div className={classes.container}>
    <Provider store={store}>
      <Router />
    </Provider>
    <Notification />
  </div>
));
