import mongoose from "mongoose";
import process from "node:process";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URI);
    console.log("database connected successfully !", connection?.connections[0]?.host);
  } catch (error) {
    console.log("database connection field", error);
  }
};

export { connectDB };
