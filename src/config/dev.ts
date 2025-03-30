import { Config } from "./types";

export const devEnv: Config = {
  API_PORT: 3001,
  DB: {
    HOST: "mongodb+srv://satish:satish@cluster0.eayz3hr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  JWT: {
    SECRET_EXP: "1h",
    SECRET_KEY: "jncdjwndwjdnew",
  },
  MAIL: {
    AUTH_PASSWORD: "tiqofikabucjraqp",
    AUTH_USER: "satishreddytarapareddy44@gmail.com",
    FROM: "Satish Reddy <satishreddytarapareddy44@gmail.com>",
    HOST: "smtp.gmail.com",
    PORT: "465",
    SECURE: true,
  },
  URLS: {
    DHVANI_API: "http://localhost:3000",
    DHVANI_UI: "http://localhost:5173",
  },
};
