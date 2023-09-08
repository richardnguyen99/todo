import { Request, Response } from "express";

import type { QueryResolvers } from "@generated/resolvers-types";

import mock from "../mock";
import authService from "@services/auth";
import { ValidateRequest, ValidateResponse } from "@/services/auth_pb";

const getUser: QueryResolvers["getUser"] = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const req = _context.req as Request;
  const res = _context.res as Response;

  // Add support headers for CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.cookies["access_token"])
    return {
      id: "",
      name: "no access token",
      email: "",
    };

  const validateRequest = new ValidateRequest();
  validateRequest.setAccessToken(req.cookies["access_token"]);

  return new Promise<ValidateResponse>((resolve, reject) =>
    authService.validate(validateRequest, (err, result) => {
      if (err) reject(err);

      resolve(result);
    })
  )
    .then((result) => {
      const response = {
        id: result.getId(),
        name: result.getName(),
        email: result.getEmail(),
      };

      return response;
    })
    .catch((_err) => {
      return {
        id: "",
        name: "internal server error",
        email: "",
      };
    });
};

const user: QueryResolvers["user"] = async (
  _parent,
  _args,
  _context,
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
  getUser,
};
