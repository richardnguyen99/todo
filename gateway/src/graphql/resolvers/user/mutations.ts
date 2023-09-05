import * as grpc from "@grpc/grpc-js";
import { Request } from "express";

import type { MutationResolvers } from "@generated/resolvers-types";
import services from "@graphql/resolvers/user/services";
import authService from "@services/auth";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@services/auth_pb";

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

  const loginRequest = new LoginRequest();
  loginRequest.setEmail(input.email);
  loginRequest.setPassword(input.password);

  const req = _context.req as Request;
  const metadata = new grpc.Metadata();

  console.log(req.headers);

  if (req.headers["origin"]) {
    metadata.add("origin", req.headers["origin"] as string);
  }

  metadata.add(
    "forwarded",
    `for=${req.ip};by=todo-gateway;proto=${req.protocol}`
  );

  return new Promise<LoginResponse>((resolve, reject) =>
    authService.login(loginRequest, metadata, (err, res) => {
      console.log("sent");
      if (err) {
        reject(err);
      }

      resolve(res);
    })
  ).then((res) => {
    return {
      status: res.getStatusCode(),
      message: res.getMessage(),
      accessToken: res.getAccessToken(),
      refreshToken: res.getRefreshToken(),
    };
  });
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

  return new Promise<RegisterResponse>((resolve, reject) =>
    authService.register(registerRequest, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      console.log(res);

      resolve(res);
    })
  ).then((res) => {
    return {
      status: res.getStatusCode(),
      message: res.getMessage(),
    };
  });
};

export default {
  createUser,
  updateUser,
  deleteUser,
  login,
  register,
};
