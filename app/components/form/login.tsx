"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "@components/input/input";
import PasswordInput from "@components/input/password-input";

type LoginInput = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(watch("email"));

  const onSubmit: SubmitHandler<LoginInput> = async (data, e) => {
    e?.preventDefault();

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({
          query,
          variables: {
            input: {
              email: data.email,
              password: data.password,
            },
          },
        }),

        keepalive: true,
      });

      const json = await res.json();

      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-email-input"
        >
          Email
        </label>
        <Input id="login-email-input" {...register("email")} />
      </div>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-password-input"
        >
          Password
        </label>
        <PasswordInput {...register("password")} />
      </div>

      {/* Remember me */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            id="remember"
            name="remember"
          />
          <label className="block text-sm font-bold text-gray-700">
            Remember Me
          </label>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button
          className="rounded-lg px-4 py-2 font-bold text-white bg-blue-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-sky-700"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;

export const query = `#graphql
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
       token,
       message,
       status
    }
  }
`;
