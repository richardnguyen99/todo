import app from "./app";

import config from "./config";

const server = app.listen(config.port, () => {
  const env = config.env.development ? "DEVELOPMENT" : "PRODUCTION";

  console.log(`[${env}] Listening on port ${config.port}}`);
});

export default server;
