"use client";
import * as React from "react";

type Props = React.PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement> & {
    initialValue?: string;

    onChangeCallback?: (value: string) => void;
  }
>;

const Input: React.FC<Props> = ({
  initialValue = "",
  className: _className,
  onChangeCallback,
  ...rest
}) => {
  const [value, setValue] = React.useState(initialValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChangeCallback !== "function") return;

    console.log("blurHandler: ", value);
    onChangeCallback(value);
  };

  return (
    <input
      {...rest}
      className="w-full px-3 py-2 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};

export default Input;
