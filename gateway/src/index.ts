import createExpressApp from "./app";

import config from "./config";

(async () => {
  const server = await createExpressApp();

  // @ts-ignore
  await new Promise((resolve) => server.listen({ port: config.port }, resolve));

  console.log(`🚀 Server ready at http://localhost:${config.port}`);
})();
