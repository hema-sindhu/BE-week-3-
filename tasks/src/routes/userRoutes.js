const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userSchema'); // Correct import

// Route for adding a new user
router.post('/add', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
