"use client";

import * as React from "react";
import clsx from "classnames";
import { twMerge } from "tailwind-merge";

export interface OptionButtonProps {}

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLButtonElement> & OptionButtonProps
>;

const AppCoreOptionButton: React.FC<Props> = ({
  onClick,
  className: _className,
  children,
  ...rest
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();

        if (typeof onClick === "function") onClick(e);
      },
      [onClick]
    );

  return (
    <button
      {...rest}
      type="button"
      onClick={handleClick}
      className={twMerge(
        clsx("", {
          "flex items-center": true,
          "gap-2 px-2 py-1 rounded-md": true,
          "hover:bg-slate-100": true,
        }),
        _className
      )}
    >
      {children}
    </button>
  );
};

export default AppCoreOptionButton;
