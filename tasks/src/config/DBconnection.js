const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database Connected ✅");
    } catch (error) {
        console.log("ERROR in connecting!", error);
    }
};

module.exports = connectToDB;
