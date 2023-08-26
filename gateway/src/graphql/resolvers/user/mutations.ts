import { ObjectId } from "bson";

import type { MutationResolvers, User } from "@generated/resolvers-types";

import mock from "../mock";

const createUser: MutationResolvers["createUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { input } = _args;

  if (mock.find((user: any) => user.email === input.email && user.name === input.name)) {
    throw new Error(`User already exists: ${input.name}`);
  };

  const user = { ...input, id: new ObjectId().toHexString() };

  (mock as User[]).push(user);

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
