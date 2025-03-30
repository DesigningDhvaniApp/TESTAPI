import * as winston from "winston";
import * as path from "path";
import * as fs from "fs";
import { DateTime } from "luxon";

// Base logs directory
const baseLogsDir = path.join(__dirname, "logs");

// Helper to generate the folder name based on the date range
const generateFolderName = () => {
  const now = DateTime.local();
  const startDate = now.minus({ days: 13 }).toFormat("yyyyMMdd");
  const endDate = now.toFormat("yyyyMMdd");
  return `${startDate}_${endDate}`;
};

// Ensure folder for the date range exists
const folderName = generateFolderName();
const logsDir = path.join(baseLogsDir, folderName);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define logger
const Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      if (typeof message === "object") {
        return `${timestamp} [${level.toUpperCase()}]: \n${JSON.stringify(message, null, 2)}`;
      }
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "logs.log"), // General logs
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "errors.log"), // Error logs
      level: "error",
    }),
    new winston.transports.Console({
      // Add Console transport
      format: winston.format.combine(
        winston.format.colorize(), // Add colors for console output
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          if (typeof message === "object") {
            return `${timestamp} [${level}]: \n${JSON.stringify(message, null, 2)}`;
          }
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        }),
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "errors.log"), // Unhandled exceptions
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "errors.log"), // Unhandled promise rejections
    }),
  ],
});

export default Logger;
