/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import path from "path";
import fs from "fs";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.join(__dirname, "./login.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const rootCert = fs.readFileSync(process.env.AUTH_SSL);
const sslCreds = grpc.credentials.createSsl(rootCert);

const loginProto = grpc.loadPackageDefinition(packageDefinition)["auth"];

const client = new loginProto!.Auth("localhost:7135", sslCreds);

console.log("client: ", client.credentials);

const loginRPC = () => {
  client.login(
    {
      email: "me@example.com",
      password: "123456",
    },
    (err, response) => {
      if (err) {
        throw new Error(err.message);
      } else {
        console.log("response: ", response);
      }
    }
  );
};

export default loginRPC;
