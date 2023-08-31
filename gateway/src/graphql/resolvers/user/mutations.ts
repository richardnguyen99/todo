import type { MutationResolvers } from "@generated/resolvers-types";

import services from "./services";

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
  const updateUserInput = _args.input;

  const updatedUser = await services.updateUser(id, updateUserInput);

  return updatedUser;
};

const deleteUser: MutationResolvers["deleteUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { id } = _args;

  const deletedUser = await services.deleteUser(id);

  return deletedUser;
};

const login: MutationResolvers["login"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { input } = _args;

  return {
    token: `token: ${input.email}`,
    message: "message",
    status: 200,
  };
};

export default {
  createUser,
  updateUser,
  deleteUser,
  login,
};
