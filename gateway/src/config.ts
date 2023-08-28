import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".dev.env" : ".prod.env",
  override: false,
});

const port = process.env.PORT || 3000;

// Avoid string comparison
const env = {
  development: process.env.NODE_ENV === "development",
  production: process.env.NODE_ENV === "production",
  testing: process.env.NODE_ENV === "test",
};

export default { port, env };
