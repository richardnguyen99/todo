declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    readonly NODE_ENV: "development" | "production" | "testing";
    readonly USE_MOCK: boolean;
    readonly PORT: string;
  }
}
