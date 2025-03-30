import { ConnectToDataSource } from "#db-utils/source";

import app from "./app";
import config from "./config";
import Logger from "./logger";

const PORT = process.env.PORT ?? config.API_PORT;

const InitServer = async () => {
  await ConnectToDataSource();
  app.listen(PORT);
};

InitServer().then(
  () => Logger.info(`Listening on http://localhost:${PORT}`),
  (error: unknown) => Logger.error(`Failed to initialize server: ${error}`),
);
