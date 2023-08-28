import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".dev.env" : ".prod.env",
});

const port = process.env.PORT || 3000;

// Avoid string comparison
const env = {
  development: process.env.NODE_ENV === "development",
  production: process.env.NODE_ENV === "production",
  testing: process.env.NODE_ENV === "testing",
};

export default { port, env };
