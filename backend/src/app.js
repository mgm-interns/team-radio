import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import api from './api';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cookieParser());

// Serve api router
app.use('/api', api);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../..', 'frontend', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.use('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../..', 'frontend', 'build', 'index.html'),
  );
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

export default app;
