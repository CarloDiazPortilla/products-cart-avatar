import mongoose from "mongoose";
import { EnvironmentAdapter } from "../../config/environment.adapter";

export const connectDB = async (): Promise<void> => {
  try {
    console.log(EnvironmentAdapter.envs.MONGO_URI);
    await mongoose.connect(EnvironmentAdapter.envs.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to database");
  }
};
