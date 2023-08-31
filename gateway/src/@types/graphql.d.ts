// Declare this one so that graphql files can be imported during compilation

declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}
