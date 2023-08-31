"use client";
import * as React from "react";
import clsx from "classnames";

import type { InputProps } from "../form/types";

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
      className: _className,
      onChangeCallback,
      onValidateCallback,
      onBlurCallback,
      ...rest
    },
    ref
  ) => {
    const [state, setState] = React.useState(InputStateType.PRIMARY);
    const [value, setValue] = React.useState(initialValue);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      if (typeof onChangeCallback !== "function") return;

      onChangeCallback(e.target.value);
    };

    const updateStateOnValidation = () => {
      if (typeof onValidateCallback !== "function") return;

      const isValid = onValidateCallback(value);

      if (isValid) {
        setState(InputStateType.SUCCESS);
      } else {
        setState(InputStateType.ERROR);
      }
    };

    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onBlurCallback !== "function") return;

      updateStateOnValidation();

      onBlurCallback(value);
    };

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
          "ring-gray-400": state === InputStateType.PRIMARY,
          "text-gray-700 ": state === InputStateType.PRIMARY,
          "hover:border-gray-400": state === InputStateType.PRIMARY,
          "focus:border-gray-400": state === InputStateType.PRIMARY,

          "ring-red-400": state === InputStateType.ERROR,
          "text-red-700 ": state === InputStateType.ERROR,
          "hover:border-red-400": state === InputStateType.ERROR,
          "focus:border-red-400": state === InputStateType.ERROR,

          "ring-green-400": state === InputStateType.SUCCESS,
          "text-green-700 ": state === InputStateType.SUCCESS,
          "hover:border-green-400": state === InputStateType.SUCCESS,
          "focus:border-green-400": state === InputStateType.SUCCESS,
        })}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
