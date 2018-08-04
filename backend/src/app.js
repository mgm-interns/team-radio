/* eslint-disable */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import compression from 'compression';
import mongoose from 'mongoose';

import Routes from './routes';
import * as players from './players';
// import mongoose from 'mongoose'
const mongodbConnectionString =
  process.env.MONGODB ||
  'mongodb://radioteam:radioteam@ds133547.mlab.com:33547/backendradio';

const db = mongoose.connection;

db.on('connecting', function() {
  console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function() {
  console.log('MongoDB connected!');
});
db.once('open', function() {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function() {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
  console.log('MongoDB disconnected! - Reconnect the database after 3s...');
  // Reconnect the database after 3s
  setTimeout(() => {
    mongoose.connect(
      mongodbConnectionString,
      {
        server: { auto_reconnect: true },
      },
    );
  }, 3000);
});
mongoose.connect(
  mongodbConnectionString,
  { server: { auto_reconnect: true } },
);

const app = express();
app.set('superSecret', 'iloveteamradio');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression());
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
