// package: auth
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LoginRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): LoginRequest;
    getPassword(): string;
    setPassword(value: string): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class LoginResponse extends jspb.Message { 
    getAccessToken(): string;
    setAccessToken(value: string): LoginResponse;
    getRefreshToken(): string;
    setRefreshToken(value: string): LoginResponse;
    getId(): string;
    setId(value: string): LoginResponse;
    getUsername(): string;
    setUsername(value: string): LoginResponse;
    getEmail(): string;
    setEmail(value: string): LoginResponse;
    getMessage(): string;
    setMessage(value: string): LoginResponse;
    getStatusCode(): number;
    setStatusCode(value: number): LoginResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginResponse;
    static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
    export type AsObject = {
        accessToken: string,
        refreshToken: string,
        id: string,
        username: string,
        email: string,
        message: string,
        statusCode: number,
    }
}

export class RegisterRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): RegisterRequest;
    getPassword(): string;
    setPassword(value: string): RegisterRequest;
    getEmail(): string;
    setEmail(value: string): RegisterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterRequest;
    static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
    export type AsObject = {
        username: string,
        password: string,
        email: string,
    }
}

export class RegisterResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): RegisterResponse;
    getStatusCode(): number;
    setStatusCode(value: number): RegisterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterResponse): RegisterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterResponse;
    static deserializeBinaryFromReader(message: RegisterResponse, reader: jspb.BinaryReader): RegisterResponse;
}

export namespace RegisterResponse {
    export type AsObject = {
        message: string,
        statusCode: number,
    }
}

export class ValidateRequest extends jspb.Message { 
    getAccessToken(): string;
    setAccessToken(value: string): ValidateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateRequest): ValidateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateRequest;
    static deserializeBinaryFromReader(message: ValidateRequest, reader: jspb.BinaryReader): ValidateRequest;
}

export namespace ValidateRequest {
    export type AsObject = {
        accessToken: string,
    }
}

export class ValidateResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): ValidateResponse;
    getStatusCode(): number;
    setStatusCode(value: number): ValidateResponse;
    getId(): string;
    setId(value: string): ValidateResponse;
    getName(): string;
    setName(value: string): ValidateResponse;
    getEmail(): string;
    setEmail(value: string): ValidateResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateResponse): ValidateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateResponse;
    static deserializeBinaryFromReader(message: ValidateResponse, reader: jspb.BinaryReader): ValidateResponse;
}

export namespace ValidateResponse {
    export type AsObject = {
        message: string,
        statusCode: number,
        id: string,
        name: string,
        email: string,
    }
}
