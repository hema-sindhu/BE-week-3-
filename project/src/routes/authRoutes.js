// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../service/authService');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await authService.register(username, password);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.authenticate(username, password);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).send('Logged in');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
