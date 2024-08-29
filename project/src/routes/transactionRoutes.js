const express = require('express');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  // Handle GET requests for transactions
  res.json({ message: 'Protected transactions route' });
});

// Add more protected routes as needed

module.exports = router;
