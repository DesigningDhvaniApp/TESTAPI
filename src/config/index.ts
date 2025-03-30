import { isEqual } from "lodash";

// import dotenv from "dotenv";
import Logger from "../logger";
import { devEnv } from "./dev";
import { prodEnv } from "./prod";
// dotenv.config();

const defaultEnv = process.env.ENV ?? "prod";

Logger.info(defaultEnv);

const config = isEqual(defaultEnv, "dev") ? devEnv : prodEnv;

export default config;
