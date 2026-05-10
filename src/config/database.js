import mongoose from "mongoose";
import config from "./config.js";
import dns from 'dns'

// Change DNS servers
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
  ]);

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected")
  } catch (error) {
    console.log("Database connection faild", error.message)
  }
};

export default connectDB