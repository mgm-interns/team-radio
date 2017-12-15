import express from 'express';

const router = express.Router();

// Prefix: api

// For demonstration
router.get('/', (req, res) => {
  res.json({
    title: 'Express',
    content: 'Hello Express',
  });
});

export default router;
