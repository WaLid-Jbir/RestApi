const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB 🛢️ ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnection;