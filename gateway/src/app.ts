import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';


import config from "./config";

const schema = `#graphql
  type Query {
    hello: String
  }
`;

const createExpressApp = async () => {

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: {
      Query: {
        hello: () => "Hello world!",
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
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
    expressMiddleware(server)
  );

  return httpServer;
};




export default createExpressApp;
