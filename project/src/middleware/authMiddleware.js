// src/middleware/authMiddleware.js
const authService = require('../service/authService');

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const user = authService.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = authenticateToken;
