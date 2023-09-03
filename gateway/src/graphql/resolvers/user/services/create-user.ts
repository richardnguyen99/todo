import { ObjectId } from "bson";

import config from "@/config";
import mock from "@graphql/resolvers/mock";
import { CreateUserInput, User } from "@generated/resolvers-types";

const willUseMock =
  config.env.testing || (config.env.development && process.env.USE_MOCK);

const _createUserMock = async (userEntity: CreateUserInput) => {
  const { name, email } = userEntity;
  const user = mock.find((user) => user.email === email && user.name === name);

  if (typeof user !== "undefined") {
    throw new Error(`User already exists: ${name}`);
  }

  const newUser: User = {
    id: new ObjectId().toHexString(),
    ...userEntity,
  };

  (mock as User[]).push(newUser);

  return newUser;
};

const _createUser = async (userEntity: CreateUserInput) => {
  const { name, email } = userEntity;
  const user = mock.find((user) => user.email === email && user.name === name);

  if (!user) {
    throw new Error(`User already exists: ${name}`);
  }

  user.id = new ObjectId().toHexString();

  (mock as User[]).push(user);

  return user;
};

const createUser = async (user: CreateUserInput) => {
  if (willUseMock) return await _createUserMock(user);

  return await _createUser(user);
};

export default createUser;
