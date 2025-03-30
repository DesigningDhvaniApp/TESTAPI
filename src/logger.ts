import { DateTime } from "luxon";
import * as winston from "winston";
import "#utils/globals";

// Define logger
const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      if (typeof message === "object") {
        return `${timestamp} [${level.toUpperCase()}]: \n${JSON.stringify(message, null, 2)}`;
      }
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
    }),
  ),
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors for console output
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          if (typeof message === "object") {
            return `${timestamp} [${level}]: \n${JSON.stringify(message, null, 2)}`;
          }
          return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
        }),
      ),
    }),
  ],
});

export default Logger;
