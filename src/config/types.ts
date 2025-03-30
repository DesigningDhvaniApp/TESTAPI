export interface Config {
  API_PORT: number;
  DB: {
    HOST: string;
  };
  JWT: {
    SECRET_EXP: string;
    SECRET_KEY: string;
  };
  MAIL: {
    AUTH_PASSWORD: string;
    AUTH_USER: string;
    FROM: string;
    HOST: string;
    PORT: string;
    SECURE: boolean;
  };
  URLS: {
    DHVANI_API: string;
    DHVANI_UI: string;
  };
}
