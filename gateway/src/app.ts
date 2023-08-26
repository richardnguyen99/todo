import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema";

const app = express();

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: { hello: () => "Hello, World!" },
  graphiql: true,
}));


export default app;
