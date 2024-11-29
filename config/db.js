const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB server issue:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
