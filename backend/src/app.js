/* eslint-disable */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
const mongoose = require('mongoose');

import Routes from './routes';
import * as players from './players';
// import mongoose from 'mongoose'
const mongodbConnectionString =
  process.env.MONGODB ||
  'mongodb://mgm:mgm123@ds013564.mlab.com:13564/mgm-radio';

const Schema = mongoose.Schema;
mongoose.connect(mongodbConnectionString);
mongoose.connection.on('open', () => {
  console.log('Mongoose is connected!');
});

const app = express();
app.set('superSecret', 'iloveteamradio');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cookieParser());

// Serve api router
// app.use('/api', api)
app.use('/api', cors(['http://localhost:3000']), Routes);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../..', 'frontend', 'build')));

// Always return the main index.html, so react-router render the route in the client
// app.use('*', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '../..', 'frontend', 'build', 'index.html'),
//   );
// });

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

players.init();

export default app;
