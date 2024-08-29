// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Ensure this is stored securely

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
