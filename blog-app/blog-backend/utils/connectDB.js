import mongoose from "mongoose";
import { logInfo, logError } from "./logger.js";
import { MONGODB_URI } from "../utils/config.js";

const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logInfo("connected to MongoDB");
  } catch (error) {
    logError("error connecting to MongoDB", error.message);
  }
};

export default connectDB;
