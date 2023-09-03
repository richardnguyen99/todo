import type {
  MutationResolvers,
  RegisterPayload,
} from "@generated/resolvers-types";

import services from "@graphql/resolvers/user/services";
import authService from "@services/auth";
import { RegisterRequest } from "@services/auth_pb";

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

const register: MutationResolvers["register"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const { input } = _args;

  const registerRequest = new RegisterRequest();
  registerRequest.setEmail(input.email);
  registerRequest.setPassword(input.password);
  registerRequest.setUsername(input.username);

  const response = {} as RegisterPayload;
  await authService.register(registerRequest, (err, res) => {
    if (err) {
      console.log(err);
      throw new Error(err.message);
    }

    console.log(res);

    response.status = res.getStatusCode();
    response.message = res.getMessage();
    response.token = res.getToken();
  });

  return response;
};

export default {
  createUser,
  updateUser,
  deleteUser,
  login,
  register,
};
