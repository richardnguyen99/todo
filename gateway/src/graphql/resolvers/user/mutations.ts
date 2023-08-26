import { ObjectId } from "bson";

import mock from "../mock";

const createUser = async (_: any, _args: any) => {
  const { input } = _args;

  if (mock.find((user: any) => user.email === input.email && user.name === input.name)) {
    throw new Error(`User already exists: ${input.name}`);
  };

  const user = { ...input, id: new ObjectId().toHexString() };

  mock.push(user);

  return user;
};

const updateUser = async (_: any, _args: any) => {
  const { id } = _args;
  const user = mock.find((user: any) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = { ...user, ..._args.input };

  mock.splice(mock.indexOf(user), 1, updatedUser);

  return updatedUser;
};

const deleteUser = async (_: any, _args: any) => {
  const { id } = _args;
  const user = mock.find((user: any) => user.id === id);

  if (!user) {
    throw new Error(`User ID not found: ${id}`);
  }

  mock.splice(mock.indexOf(user), 1);

  return user;
};

export default {
  createUser,
  updateUser,
  deleteUser
};
