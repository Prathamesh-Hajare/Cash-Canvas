const mongoose = require('mongoose'); // Importing Mongoose to interact with MongoDB

// Asynchronous function to connect to the MongoDB database
const db = async () => {
    try {
        // Disable strict mode for queries in Mongoose
        mongoose.set('strictQuery', false);
        
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URL);
        
        console.log('Db Connected'); // Log a message upon successful connection
    } catch (error) {
        console.log('DB Connection Error'); // Log a message if there's an error connecting to the database
    }
}

module.exports = { db }; // Export the 'db' function to be used in other parts of the application
