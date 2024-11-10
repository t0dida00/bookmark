// db.js
const mongoose = require('mongoose');

// Replace with your MongoDB URI
const uri = process.env.NEXT_PUBLIC_MONGODB_URI
// or for MongoDB Atlas use:
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourDatabaseName?retryWrites=true&w=majority';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
let isConnected = false; // Track if the connection is established

async function connectDB() {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // Use clientOptions for the connection
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri, { ...clientOptions, useNewUrlParser: true, useUnifiedTopology: true });

        isConnected = mongoose.connection.readyState === 1; // Check if connected
        console.log('MongoDB connection established');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}


export default connectDB;