// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

function serialize_auth_LoginRequest(arg) {
  if (!(arg instanceof auth_pb.LoginRequest)) {
    throw new Error('Expected argument of type auth.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_LoginRequest(buffer_arg) {
  return auth_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_LoginResponse(arg) {
  if (!(arg instanceof auth_pb.LoginResponse)) {
    throw new Error('Expected argument of type auth.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_LoginResponse(buffer_arg) {
  return auth_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_RegisterRequest(arg) {
  if (!(arg instanceof auth_pb.RegisterRequest)) {
    throw new Error('Expected argument of type auth.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_RegisterRequest(buffer_arg) {
  return auth_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_RegisterResponse(arg) {
  if (!(arg instanceof auth_pb.RegisterResponse)) {
    throw new Error('Expected argument of type auth.RegisterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_RegisterResponse(buffer_arg) {
  return auth_pb.RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_ValidateRequest(arg) {
  if (!(arg instanceof auth_pb.ValidateRequest)) {
    throw new Error('Expected argument of type auth.ValidateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_ValidateRequest(buffer_arg) {
  return auth_pb.ValidateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_ValidateResponse(arg) {
  if (!(arg instanceof auth_pb.ValidateResponse)) {
    throw new Error('Expected argument of type auth.ValidateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_ValidateResponse(buffer_arg) {
  return auth_pb.ValidateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthService = exports.AuthService = {
  validate: {
    path: '/auth.Auth/Validate',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.ValidateRequest,
    responseType: auth_pb.ValidateResponse,
    requestSerialize: serialize_auth_ValidateRequest,
    requestDeserialize: deserialize_auth_ValidateRequest,
    responseSerialize: serialize_auth_ValidateResponse,
    responseDeserialize: deserialize_auth_ValidateResponse,
  },
  login: {
    path: '/auth.Auth/Login',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.LoginRequest,
    responseType: auth_pb.LoginResponse,
    requestSerialize: serialize_auth_LoginRequest,
    requestDeserialize: deserialize_auth_LoginRequest,
    responseSerialize: serialize_auth_LoginResponse,
    responseDeserialize: deserialize_auth_LoginResponse,
  },
  register: {
    path: '/auth.Auth/Register',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.RegisterRequest,
    responseType: auth_pb.RegisterResponse,
    requestSerialize: serialize_auth_RegisterRequest,
    requestDeserialize: deserialize_auth_RegisterRequest,
    responseSerialize: serialize_auth_RegisterResponse,
    responseDeserialize: deserialize_auth_RegisterResponse,
  },
};

exports.AuthClient = grpc.makeGenericClientConstructor(AuthService);
