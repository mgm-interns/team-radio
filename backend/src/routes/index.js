import express from 'express';

// Initiate new Router instance
const router = express.Router();

const handlers = [
  // Declare api handlers
  require('./user'),
  require('./station'),
];

// Register handlers
handlers.map(handler => handler.default(router));

// Export router
export default router;
