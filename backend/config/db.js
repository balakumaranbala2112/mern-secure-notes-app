import mongoose from "mongoose";
import "../config/db.js";
import "dotenv/config";
  
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
