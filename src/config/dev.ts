import { Config } from "./types";

export const devEnv: Config = {
  API_PORT: 3001,
  DB: {
    HOST: "mongodb+srv://satish:satish@cluster0.eayz3hr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  MAIL: {
    HOST: "smtp.gmail.com",
    PORT: "465",
    AUTH_USER: "satishreddytarapareddy44@gmail.com",
    AUTH_PASSWORD: "tiqofikabucjraqp",
    SECURE: true,
    FROM: "Satish Reddy <satishreddytarapareddy44@gmail.com>",
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
