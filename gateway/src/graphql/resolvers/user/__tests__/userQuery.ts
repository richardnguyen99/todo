import { ApolloServer } from "@apollo/server";

import schema from "@graphql/schema";
import rootResolver from "@graphql/resolvers";
import mock from "@graphql/resolvers/mock";

const sum = (a: number, b: number) => a + b;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: rootResolver,
});

describe("query MyUserQuery()", () => {
  beforeAll(() => {
    server.start();
  });

  it("should return 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should return all users", async () => {
    const query = `#graphql
      query JestTestUsersQuery {
        users {
          id
          name
          address
          age
          company
          dob
          email
          gender
          phone
          about
        }
      }
    `;

    const res = await server.executeOperation<typeof mock>({ query });

    expect(res.body.kind).toEqual("single");

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.data?.users).toEqual(mock);
  });

  it("it should return a user by id", async () => {
    const query = `#graphql
      query JestTestSpecificUserQuqery($userId: ID!) {
        user(id: $userId) {
          id
          name
        }
      }
    `;

    const expected = {
      id: "64ea5312a4b6e4e9e0b29f5c",
      name: "Ratliff Tanner",
    };

    const res = await server.executeOperation({
      query,
      variables: {
        userId: "64ea5312a4b6e4e9e0b29f5c",
      },
    });

    expect(res.body.kind).toEqual("single");

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.data?.user).toEqual(expected);
  });

  it("it should return an error if a user does not exist", async () => {
    const query = `#graphql
      query JestTestSpecificUserQuqery($userId: ID!) {
        user(id: $userId) {
          id
          name
        }
      }
    `;

    const res = await server.executeOperation({
      query,
      variables: {
        userId: "64ea5312a4p6e4e9e0b29f5c",
      },
    });

    expect(res.body.kind).toEqual("single");

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.data?.user).toBeNull();

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.errors).toBeDefined();

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.errors[0].message).toEqual(
      "User not found"
    );
  });

  afterAll(() => {
    server.stop();
  });
});
