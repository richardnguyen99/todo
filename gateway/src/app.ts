import express from "express";
import { graphqlHTTP } from "express-graphql";

import config from "./config";
import schema from "./schema";

const app = express();

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: { hello: () => "Hello, World!" },
  graphiql: config.env.development,
}));


export default app;
