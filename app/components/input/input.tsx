"use client";
import * as React from "react";
import clsx from "classnames";

import type { InputProps, InputVariantType } from "../form/types";

enum InputStateType {
  PRIMARY = 1,
  SUCCESS = 2,
  // WARNING = 3,
  ERROR = 4,
}

type Props = React.PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      initialValue = "",
      showState = false,
      variant,
      className: _className,
      onChangeCallback,
      onValidateCallback,
      onBlurCallback,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={clsx("", {
          "w-full px-3 py-2 leading-tight": true,
          "rounded shadow-md appearance-none border": true,
          "focus:outline-none focus:ring-2": true,

          // Use box-shadow for bolder border since changing border might causes
          // the layout to shift and glitch
          "ring-gray-400": variant === "primary",
          "text-gray-700 ": variant === "primary",
          "hover:border-gray-400": variant === "primary",
          "focus:border-gray-400": variant === "primary",

          "ring-red-400": variant === "danger",
          "text-red-700 ": variant === "danger",
          "placeholder:text-red-300": variant === "danger",
          "border-red-400": variant === "danger",
          "focus:border-red-400": variant === "danger",

          "ring-green-400": variant === "success",
          "text-green-700 ": variant === "success",
          "hover:border-green-400": variant === "success",
          "focus:border-green-400": variant === "success",
        })}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
