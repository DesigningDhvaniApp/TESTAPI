import app from "./app";
import config from "./config";
import { ConnectToDataSource } from "./db-utils/source";
import Logger from "./logger";

const PORT = config.API_PORT;

const ListenOnServer = () => {
  app.listen(PORT, () => Logger.info(`Listening on http://localhost:${PORT}`));
};

const InitServer = async () => {
  try {
    await ConnectToDataSource();
    ListenOnServer();
  } catch (error) {
    Logger.error(`Server not started`);
  }
};

InitServer();
