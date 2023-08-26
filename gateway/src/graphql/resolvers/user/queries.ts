import type { QueryResolvers } from "@generated/resolvers-types";

import mock from "../mock";

const user: QueryResolvers["user"] = async (
  _parent,
  _args,
  _context = {},
  _info
) => {
  const { id } = _args;

  const user = mock.find((user) => user.id === id);

  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const users: QueryResolvers["users"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mock;
};

export default {
  user,
  users,
};
