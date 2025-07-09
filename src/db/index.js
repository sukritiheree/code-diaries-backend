
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL
    );
    console.log("Mongoose connected successfully");
  } catch (err) {
    console.log("error connecting to mongoose" + err);
  }
};


