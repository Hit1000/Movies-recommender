import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("mongoDb connected: " + conn.connection.host);
  } catch (error) {
    console.error("error connection to mongoDB" + error.message);
    process.exit(1);
  }
};
