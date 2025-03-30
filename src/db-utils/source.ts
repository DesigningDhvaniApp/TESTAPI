import mongoose from "mongoose";
import config from "../config";
import Logger from "../logger";

export const ConnectToDataSource = async (): Promise<void> => {
  try {
    await mongoose.connect(config.DB.HOST);
    Logger.info("Mongo Data Source Connected!");
  } catch (error) {
    Logger.error("MongoDB connection error:", error);
    throw new Error(error);
  }
};
