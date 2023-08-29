"use client";

import * as React from "react";
import { EyeIcon } from "@primer/octicons-react";

import Input from "./input";
import PasswordInput from "./password-input";

const LoginForm: React.FC = () => {
  return (
    <form>
      <div className="mb-8">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-email-input"
        >
          Email
        </label>
        <Input id="login-email-input" type="email" placeholder="Email" />
      </div>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="login-password-input"
        >
          Password
        </label>
        <PasswordInput />
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
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-sky-600 focus:outline-none focus:shadow-outline"
          type="button"
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
