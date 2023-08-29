"use client";

import * as React from "react";
import { EyeIcon } from "@primer/octicons-react";

import Input from "./input";

const LoginForm: React.FC = () => {
  return (
    <form>
      <div className="mb-8">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Email
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Password
        </label>
        <div className="relative">
          <Input
            id="login-password-input"
            initialValue=""
            placeholder="Password"
            onChangeCallback={() => {}}
          />
          <div className="absolute flex top-0 right-0 bottom-0 items-center">
            <div className="mx-3">
              <EyeIcon size={16} />
            </div>
          </div>
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
