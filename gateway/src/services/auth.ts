import fs from "fs";
import * as grpc from "@grpc/grpc-js";

import { AuthClient } from "./auth_grpc_pb";

const rootCert = fs.readFileSync(process.env.AUTH_SSL);
const sslCreds = grpc.credentials.createSsl(rootCert);

const authClient = new AuthClient("localhost:7135", sslCreds);

export default authClient;
