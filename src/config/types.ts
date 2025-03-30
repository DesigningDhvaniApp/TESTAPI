export interface Config {
  API_PORT: number;
  DB: {
    HOST: string;
  };
  MAIL: {
    HOST: string;
    PORT: string;
    AUTH_USER: string;
    AUTH_PASSWORD: string;
    SECURE: boolean;
    FROM: string;
  };
  JWT: {
    SECRET_KEY: string;
    SECRET_EXP: string;
  };
  URLS: {
    DHVANI_UI: string;
    DHVANI_API: string;
  };
}
