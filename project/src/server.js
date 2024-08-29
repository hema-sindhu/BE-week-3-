// src/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  // Add this line
const db = require('./dataAccess/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const logger = require('./infrastructure/logger');
const authenticateToken = require('./middleware/authMiddleware'); // Add this line

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());  // Add this line

app.use('/api/auth', authRoutes);
app.use('/api/transactions', authenticateToken, transactionRoutes); // Protect this route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
