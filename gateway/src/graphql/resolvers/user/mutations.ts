import type { MutationResolvers, User } from "@generated/resolvers-types";

import services from "./services";
import mock from "../mock";

const createUser: MutationResolvers["createUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { input } = _args;

  const user = await services.createUser(input);

  return user;
};

const updateUser: MutationResolvers["updateUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { id } = _args;
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser: User = { ...user, ..._args.input } as User;

  (mock as User[]).splice(mock.indexOf(user), 1, updatedUser);

  return updatedUser;
};

const deleteUser: MutationResolvers["deleteUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { id } = _args;
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error(`User ID not found: ${id}`);
  }

  mock.splice(mock.indexOf(user), 1);

  return user;
};

export default {
  createUser,
  updateUser,
  deleteUser,
};
