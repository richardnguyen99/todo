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
        "text-neutral-600 hover:text-neutral-950": true,
        "transition-colors duration-300 ease-in": true,
      })}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
