declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    readonly NODE_ENV: "development" | "production" | "test";
    readonly USE_MOCK: boolean;
    readonly PORT: string;

    readonly AUTH_URL: string;
    readonly AUTH_SSL: string;
  }
}
