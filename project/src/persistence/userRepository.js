// src/persistence/userRepository.js
const User = require('../domain/user');

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findUserByUsername(username) {
    return User.findOne({ username });
  }
}

module.exports = new UserRepository();
