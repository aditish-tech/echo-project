const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri === 'your_mongodb_connection_string_here') {
    console.warn('DATABASE WARNING: MONGODB_URI is placeholder or empty. Starting backend in-memory simulation mode.');
    return;
  }
  
  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.warn('Database connection failed. Falling back to in-memory simulation mode.');
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
