require('dotenv').config();  
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { dbName: 'NewTest' });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    if (error.message.includes('Authentication failed')) {
      console.error('Authentication failed - check username and password');
    }
    process.exit(1);
  }
};
module.exports = connectDB;
