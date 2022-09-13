const mongoose = require("mongoose");
const config = require("config");
const MONGO_URI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); 
    console.log("MongoDB is Connected!");
  } catch (err) {
    console.log("Error ==>> ", err.message);
    process.exit(1);                                         // exit code if any issue occurs or application crashes all the way!
  }
};  

module.exports = connectDB;
