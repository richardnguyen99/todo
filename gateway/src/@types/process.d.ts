declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
  }
}
