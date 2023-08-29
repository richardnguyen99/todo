import * as React from "react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

import type { InputProps } from "./types";
import Input from "./input";

type Props = React.PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>;

const PasswordInput: React.FC<Props> = ({
  initialValue = "",
  showState = false,
  className: _className,
  onChangeCallback,
  onValidateCallback,
  onBlurCallback,
  ...rest
}) => {
  const [state, setState] = React.useState(false);

  return (
    <div className="relative">
      <Input
        {...rest}
        id="login-password-input"
        initialValue=""
        placeholder="Password"
        type={state ? "text" : "password"}
        onChangeCallback={() => {}}
      />
      <div className="absolute flex top-0 right-0 bottom-0 items-center hover:bg-slate-300/50 rounded-r m-[3px]">
        <button
          type="button"
          className="px-3"
          onClick={() => {
            setState((prev) => !prev);
          }}
        >
          {state ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
