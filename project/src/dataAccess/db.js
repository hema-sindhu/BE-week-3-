// src/dataAccess/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Load the connection string from environment variables
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));
