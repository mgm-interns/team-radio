/* eslint-disable */
import express from 'express';

// Initiate new Router instance
const router = express.Router();

const handlers = [
  // Declare api handlers
  require('./SongRoute'),
  require('./StationRoute'),
  require('./UserRoute'),
];

// Register handlers
handlers.map(handler => handler.default(router));

// Export router
export default router;
