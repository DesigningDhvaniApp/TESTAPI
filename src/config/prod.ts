import { Config } from "./types";

export const prodEnv: Config = {
  API_PORT: 3000,
  DB: {
    HOST: "database-1.cluster-crw0ii6qis9x.us-east-1.rds.amazonaws.com",
  },
  MAIL: {
    HOST: "smtp.gmail.com",
    PORT: "465",
    AUTH_USER: "satishreddytarapareddy44@gmail.com",
    AUTH_PASSWORD: "tiqofikabucjraqp",
    SECURE: true,
    FROM: "Dhvani Foundation <satishreddytarapareddy44@gmail.com>",
  },
  JWT: {
    SECRET_KEY: "jncdjwndwjdnew",
    SECRET_EXP: "1h",
  },
  URLS: {
    DHVANI_UI: "http://localhost:5173",
    DHVANI_API: "http://localhost:3000",
  }
};
