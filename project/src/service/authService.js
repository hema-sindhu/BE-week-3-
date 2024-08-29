// src/service/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../domain/user');  // Updated import path

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Set this in your .env file

// Register new user
async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
}

// Authenticate user and generate token
async function authenticate(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  return token;
}

// Verify JWT token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  register,
  authenticate,
  verifyToken
};
