import express from 'express';

// Initiate new Router instance
const router = express.Router();

const handlers = [
  // Declare api handlers
  require('./dummy'),
];

// Register handlers
handlers.map(handler => handler(router));

// Export router
export default router;
