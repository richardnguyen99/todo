"use client";

import * as React from "react";
import clsx from "classnames";
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { CheckIcon, XIcon } from "@primer/octicons-react";

import Input from "@components/input/input";
import PasswordInput from "@components/input/password-input";
import { validateEmail } from "@/util/validate";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

type PasswordState = {
  level: number;
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [passwordState, setPasswordState] = React.useState({
    level: 0,
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handlePasswordLength = (v: string) => {
    const value = v.length >= 12;

    setPasswordState((prev) => ({
      ...prev,
      length: value,
    }));

    return value;
  };

  const handleUpperCase = (v: string) => {
    const upperCaseInStringRegex = /[A-Z]/g;
    const value = upperCaseInStringRegex.test(v);

    setPasswordState((prev) => ({
      ...prev,
      uppercase: value,
    }));

    return value;
  };

  const handleLowerCase = (v: string) => {
    const lowerCaseInStringRegex = /[a-z]/g;
    const value = lowerCaseInStringRegex.test(v);

    setPasswordState((prev) => ({
      ...prev,
      lowercase: value,
    }));

    return value;
  };

  const handleNumber = (v: string) => {
    const numberInStringRegex = /[0-9]/g;
    const value = numberInStringRegex.test(v);

    setPasswordState((prev) => ({
      ...prev,
      number: value,
    }));

    return value;
  };

  const handleSpecial = (v: string) => {
    const specialInStringRegex = /[^A-Za-z0-9]/g;
    const value = specialInStringRegex.test(v);

    setPasswordState((prev) => ({
      ...prev,
      special: value,
    }));

    return value;
  };

  const handlePasswordStrength = (v: string) => {
    const res = zxcvbn(v);

    setPasswordState((prev) => ({
      ...prev,
      level: res.score,
    }));

    return res.score;
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data, e) => {
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
    <form>
      <div className="mb-2">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="register-name-input"
        >
          Name
        </label>
        <Input
          id="register-name-input"
          placeholder="Your beautiful name"
          variant={errors.name ? "danger" : "primary"}
          {...register("name", {
            required: "A name would be nice",
          })}
        />
        <div className="text-sm text-red-400 w-full h-6 mt-4">
          {errors.name?.message}
        </div>
      </div>

      <div className="mb-2">
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
          variant={errors.email ? "danger" : "primary"}
          {...register("email", {
            required: {
              value: true,
              message: "I demand your email",
            },
            validate: {
              validEmail: (v) => validateEmail(v) || "Try to be smart, huh?",
            },
          })}
        />
        <div className="text-sm text-red-400 w-full h-6 mt-4">
          {errors.email?.message}
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="register-password-input"
        >
          Password
        </label>
        <PasswordInput
          variant={errors.password ? "danger" : "primary"}
          {...register("password", {
            required: {
              value: true,
              message: "An empty password? Really?",
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              handlePasswordStrength(e.target.value);
              handlePasswordLength(e.target.value);
              handleUpperCase(e.target.value);
              handleLowerCase(e.target.value);
              handleNumber(e.target.value);
              handleSpecial(e.target.value);
            },
          })}
        />
        <div className="mt-3">
          <div
            className={clsx("w-full h-2 gap-2 flex", {
              "[&>div:first-child]:rounded-l-full": true,
              "[&>div:last-child]:rounded-r-full": true,
              "[&>div]:bg-red-500": passwordState.level === 1,
              "[&>div]:bg-orange-500": passwordState.level === 2,
              "[&>div]:bg-yellow-500": passwordState.level === 3,
              "[&>div]:bg-green-500": passwordState.level === 4,
            })}
          >
            {Array.from({ length: passwordState.level }).map((_, i) => (
              <div key={i} className="w-1/4 h-2"></div>
            ))}
          </div>
          <div></div>
        </div>
        <div className="flex flex-col justify-center gap-2 mt-5">
          <div
            className={clsx("flex w-full gap-2", {
              "text-red-500": passwordState.length === false,
              "text-green-500": passwordState.length === true,
            })}
          >
            {passwordState.length ? (
              <CheckIcon size={16} />
            ) : (
              <XIcon size={16} />
            )}
            <span className="text-sm">12 characters required</span>
          </div>
          <div
            className={clsx("flex w-full gap-2", {
              "text-red-500": passwordState.lowercase === false,
              "text-green-500": passwordState.lowercase === true,
            })}
          >
            {passwordState.lowercase ? (
              <CheckIcon size={16} />
            ) : (
              <XIcon size={16} />
            )}
            <span className="text-sm">Password has lowercase characters</span>
          </div>
          <div
            className={clsx("flex w-full gap-2", {
              "text-red-500": passwordState.uppercase === false,
              "text-green-500": passwordState.uppercase === true,
            })}
          >
            {passwordState.uppercase ? (
              <CheckIcon size={16} />
            ) : (
              <XIcon size={16} />
            )}
            <span className="text-sm">Password has uppercase characters</span>
          </div>
          <div
            className={clsx("flex w-full gap-2", {
              "text-red-500": passwordState.number === false,
              "text-green-500": passwordState.number === true,
            })}
          >
            {passwordState.number ? (
              <CheckIcon size={16} />
            ) : (
              <XIcon size={16} />
            )}
            <span className="text-sm">Password has numbers</span>
          </div>
          <div
            className={clsx("flex w-full gap-2", {
              "text-red-500": passwordState.special === false,
              "text-green-500": passwordState.special === true,
            })}
          >
            {passwordState.special ? (
              <CheckIcon size={16} />
            ) : (
              <XIcon size={16} />
            )}
            <span className="text-sm">Password has special characters</span>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="rounded-lg px-4 py-2 font-bold text-white bg-blue-500 hover:bg-sky-600 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

export const query = `#graphql
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
       token,
       message,
       status
    }
  }
`;
