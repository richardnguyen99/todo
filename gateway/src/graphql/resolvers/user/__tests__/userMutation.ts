/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloServer } from "@apollo/server";

import schema from "@graphql/schema";
import rootResolver from "@graphql/resolvers";
import mock from "@graphql/resolvers/mock";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: rootResolver,
});

const newUser = {
  age: 28,
  name: "Shaffer Nicholson",
  gender: "male",
  company: null,
  email: "shaffernicholson@cujo.com",
  phone: "+1 (919) 524-2506",
  address: "687 Poplar Street, Bakersville, Alaska, 4170",
  about: null,
  dob: "04-18-2019",
};

describe("mutation Users()", () => {
  beforeAll(() => {
    server.start();
  });

  it("should create a user", async () => {
    const query = `#graphql
      mutation MyCreateUserMutation($input: CreateUserInput!) {
        createUser(input: $input) {
          name
          age
          email
        }
      }
    `;

    const oldLength = mock.length;
    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        input: newUser,
      },
    });

    const expected = {
      age: 28,
      name: "Shaffer Nicholson",
      email: "shaffernicholson@cujo.com",
    };

    const newAddedUser = mock.find(
      (user) =>
        user.email === expected.email &&
        user.name === expected.name &&
        user.age === expected.age
    );

    expect(res.body.kind).toEqual("single");

    // TODO: fix use any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((res.body as any).singleResult.data?.createUser).toEqual(expected);

    expect(mock.length).toEqual(oldLength + 1);

    expect(newAddedUser?.name).toEqual(expected.name);
    expect(newAddedUser?.age).toEqual(expected.age);
    expect(newAddedUser?.email).toEqual(expected.email);
  });

  it("should not create user if existing", async () => {
    const query = `#graphql
      mutation MyCreateUserMutation($input: CreateUserInput!) {
        createUser(input: $input) {
          name
          age
          email
        }
      }
    `;

    await server.executeOperation<typeof mock>({
      query,
      variables: {
        input: newUser,
      },
    });

    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        input: newUser,
      },
    });

    expect(res.body.kind).toEqual("single");

    expect((res.body as any).singleResult.data).toBeNull();

    expect(Array.isArray((res.body as any).singleResult.errors)).toBe(true);

    expect((res.body as any).singleResult.errors[0].message).toEqual(
      `User already exists: ${newUser.name}`
    );
  });

  it("should update a user", async () => {
    const query = `#graphql
      mutation MyUpdateUserQuery($updateUserId: ID!, $input: UpdateUserInput!) {
          updateUser(id: $updateUserId, input: $input) {
          id
          name
          company
        }
      }
    `;

    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        updateUserId: "64ea5312a4b6e4e9e0b29f5c",
        input: {
          company: "Costco",
        },
      },
    });

    const expected = {
      id: "64ea5312a4b6e4e9e0b29f5c",
      name: "Ratliff Tanner",
      company: "Costco",
    };

    expect(res.body.kind).toEqual("single");

    expect((res.body as any).singleResult.data).toBeTruthy();

    expect((res.body as any).singleResult.data.updateUser).toEqual(expected);
  });

  it("should not update a user if not existing", async () => {
    const query = `#graphql
      mutation MyUpdateUserQuery($updateUserId: ID!, $input: UpdateUserInput!) {
        updateUser(id: $updateUserId, input: $input) {
          id
          name
          company
        }
      }
    `;

    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        updateUserId: "64ea5312a4b6e4e9e0b29f5cd",
        input: {
          company: "Costco",
        },
      },
    });

    expect(res.body.kind).toEqual("single");

    expect((res.body as any).singleResult.data).toBeNull();

    expect(Array.isArray((res.body as any).singleResult.errors)).toBe(true);

    expect((res.body as any).singleResult.errors[0].message).toEqual(
      "User not found"
    );
  });

  it("should delete a user on delete query", async () => {
    const query = `#graphql
      mutation MyDeleteUserMutation($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
          id
          name
          email
          age
          gender
          phone
          address
          company
          dob
        }
      }
    `;

    const oldLength = mock.length;
    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        deleteUserId: "64ea5312a4b6e4e9e0b29f5c",
      },
    });

    const user = mock.find((user) => user.id === "64ea5312a4b6e4e9e0b29f5c");

    expect(res.body.kind).toEqual("single");
    expect((res.body as any).singleResult.data).toBeTruthy();
    expect((res.body as any).singleResult.data.deleteUser).toEqual({
      id: "64ea5312a4b6e4e9e0b29f5c",
      name: "Ratliff Tanner",
      email: "ratlifftanner@enersave.com",
      age: 23,
      gender: "male",
      phone: "+1 (936) 583-3633",
      address: "413 Guernsey Street, Hayes, Colorado, 5576",
      company: "Costco",
      dob: "03-13-2015",
    });

    expect(user).toBeUndefined();
    expect(mock.length).toEqual(oldLength - 1);
  });

  it("should not delete a user if not existing", async () => {
    const query = `#graphql
      mutation MyDeleteUserMutation($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
          id
          name
          email
          age
          gender
          phone
          address
          company
          dob
        }
      }
    `;

    const oldLength = mock.length;
    const testUserId = "64ea5312a4b6e4e9e0b29f5cd";
    const res = await server.executeOperation<typeof mock>({
      query,
      variables: {
        deleteUserId: testUserId,
      },
    });

    expect(res.body.kind).toEqual("single");

    expect((res.body as any).singleResult.data).toBeNull();

    expect(Array.isArray((res.body as any).singleResult.errors)).toBe(true);

    expect((res.body as any).singleResult.errors[0].message).toEqual(
      `User ID not found: ${testUserId}`
    );

    expect(mock.length).toEqual(oldLength);
  });

  afterAll(() => {
    server.stop();
  });
});
