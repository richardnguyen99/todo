"use client";

import * as React from "react";
import clsx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AppLinkProps {
  icon: React.FC;
  label: string;
  to: string;
  number: number;
}

type Props = React.HTMLAttributes<HTMLLIElement> & AppLinkProps;

const AppLink: React.FC<Props> = ({
  icon: Icon,
  label,
  to,
  number,
  ...rest
}) => {
  const pathname = usePathname();

  return (
    <li {...rest}>
      <Link
        href={to}
        className={clsx("flex items-center gap-2", {
          "px-3 py-2 rounded-md": true,
          "hover:bg-indigo-200": true,
        })}
      >
        <Icon />
        <div
          className={clsx("", {
            "flex items-center justify-between": true,
            "w-full text-sm": true,
            "text-indigo-700": pathname === to,
          })}
        >
          <p>{label}</p>
          <span>{number}</span>
        </div>
      </Link>
    </li>
  );
};

export default AppLink;
