const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log('typeof process.env.MONGO_URI: ', typeof process.env.MONGO_URI);
        console.log('process.env.MONGO_URI: ', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.log('error: ', error);
        // Exit the process w/failure
        process.exit(1);
    }
}

module.exports = connectDB;