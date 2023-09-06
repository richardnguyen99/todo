"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "@components/input/input";
import PasswordInput from "@components/input/password-input";
import { validateEmail } from "@/util/validate";

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
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data, e) => {
    console.log(data);
    e?.preventDefault();

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        credentials: "include",
      });

      const json = await res.json();

      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-email-input"
        >
          Email
        </label>
        <Input
          id="login-email-input"
          placeholder="me@example.com"
          variant={errors.email ? "danger" : "primary"}
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            validate: {
              validEmail: (v) => validateEmail(v) || "Email is not valid",
            },
          })}
        />
        <div className="text-sm text-red-400 w-full h-6 mt-4">
          {errors.email?.message}
        </div>
      </div>

      <div className="mb-3">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-password-input"
        >
          Password
        </label>
        <PasswordInput
          variant={errors.password ? "danger" : "primary"}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <div className="text-sm text-red-400 w-full h-6 mt-4">
          {errors.password?.message}
        </div>
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
       accessToken,
       refreshToken,
       message,
       status
    }
  }
`;
