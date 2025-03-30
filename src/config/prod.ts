import { Config } from "./types";

export const prodEnv: Config = {
  API_PORT: 3000,
  DB: {
    HOST: "database-1.cluster-crw0ii6qis9x.us-east-1.rds.amazonaws.com",
  },
  JWT: {
    SECRET_EXP: "1h",
    SECRET_KEY: "jncdjwndwjdnew",
  },
  MAIL: {
    AUTH_PASSWORD: "tiqofikabucjraqp",
    AUTH_USER: "satishreddytarapareddy44@gmail.com",
    FROM: "Dhvani Foundation <satishreddytarapareddy44@gmail.com>",
    HOST: "smtp.gmail.com",
    PORT: "465",
    SECURE: true,
  },
  URLS: {
    DHVANI_API: "http://localhost:3000",
    DHVANI_UI: "http://localhost:5173",
  },
};
