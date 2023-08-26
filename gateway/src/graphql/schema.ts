import { join } from "path";
import { readFileSync, readdirSync } from "fs";

const gqlDirectory = readdirSync(join(__dirname, "./typedefs"));

let typeDefs = "";

gqlDirectory.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), "utf8");
});

export default typeDefs;
