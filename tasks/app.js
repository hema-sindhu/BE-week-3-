const express = require('express');
const app = express();
const connection = require('./src/config/DBconnection');
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes'); // Import user routes

require('dotenv').config();  // Load environment variables

connection();  // Database Connection

app.use(express.json());

app.get('/', (req, res) => {
    console.log("HOME");
    res.send("Hello world!");  // Home
});

app.use('/auth/admin', adminRoutes); // Admin routes
app.use('/auth/user', userRoutes);   // User routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
