"use client";

import * as React from "react";

import Input from "@components/input/input";
import PasswordInput from "@components/input/password-input";

const RegisterForm: React.FC = () => {
  return (
    <form>
      <div className="mb-8">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="register-name-input"
        >
          Name
        </label>
        <Input id="register-name-input" placeholder="Your beautiful name" />
      </div>
      <div className="mb-8">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="register-email-input"
        >
          Email
        </label>
        <Input
          id="login-email-input"
          type="email"
          placeholder="me@example.com"
        />
      </div>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="register-password-input"
        >
          Password
        </label>
        <PasswordInput />
      </div>
      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button
          className="rounded-lg px-4 py-2 font-bold text-white bg-blue-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
