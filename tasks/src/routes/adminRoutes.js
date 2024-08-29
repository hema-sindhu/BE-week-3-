const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema'); // Correct import
const protectRoute = require('../middleware/adminProtectingRouter');

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for adding a new admin
router.post('/add', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        const savedAdmin = await newAdmin.save();

        res.status(201).json(savedAdmin);
    } catch (error) {
        console.error('Error adding admin:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
