import * as React from "react";
import clsx from "classnames";
import Link from "next/link";
import type { LinkProps } from "next/link";

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLAnchorElement> & LinkProps
>;

const HeaderLink: React.FC<Props> = ({
  children,
  className: _className,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={clsx("", {
        "px-2 py-1": true,
        "rounded-md": true,
        "hover:bg-indigo-600/75": true,
      })}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
