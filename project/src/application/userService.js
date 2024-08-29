// src/application/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../persistence/userRepository');

class UserService {
  async signUp(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserRepository.createUser({ username, password: hashedPassword });
  }

  async login(username, password) {
    const user = await UserRepository.findUserByUsername(username);
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = new UserService();
