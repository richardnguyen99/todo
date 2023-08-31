declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    NEXT_PUBLIC_API_GATEWAY_URL: string;
  }
}
