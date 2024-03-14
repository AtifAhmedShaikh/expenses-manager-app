import mongoose from "mongoose";
import { DATABASE_URI } from "../config/envManager.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URI);
    console.log("database connected successfully !", connection?.connections[0]?.host);
  } catch (error) {
    console.log("database connection field", error);
  }
};

export { connectDB };
