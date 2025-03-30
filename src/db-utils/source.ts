import config from "#config/index.ts";
import Logger from "#logger.ts";
import mongoose from "mongoose";

export const ConnectToDataSource = async (): Promise<void> => {
  try {
    await mongoose.connect(config.DB.HOST);
    Logger.info("Mongo Data Source Connected!");
  } catch (error: unknown) {
    Logger.error("MongoDB connection error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
