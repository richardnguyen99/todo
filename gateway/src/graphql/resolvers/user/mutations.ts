import type { MutationResolvers } from "@generated/resolvers-types";

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

export default {
  createUser,
  updateUser,
  deleteUser,
};
