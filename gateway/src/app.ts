import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

import config from "./config";
import schema from "./graphql/schema";
import rootResolver from "./graphql/resolvers";

const createExpressApp = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  // prettier-ignore
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: rootResolver,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      (config.env.production) ? ApolloServerPluginLandingPageProductionDefault({
        graphRef: "my-graph-id@my-graph-variant",
        footer: false,
      }) : ApolloServerPluginLandingPageLocalDefault()
    ],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  return httpServer;
};

export default createExpressApp;
