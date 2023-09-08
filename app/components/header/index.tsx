import * as React from "react";
import clsx from "classnames";
import { MarkGithubIcon } from "@primer/octicons-react";

import HeaderLink from "./link";
import GroupLink from "./group-link";

const Header: React.FC = () => {
  return (
    <header
      aria-description="header"
      className={clsx("", {
        "fixed w-full bg-white z-50": true,
        "shadow-lg drop-shadow-lg shadow-slate-300": true,
      })}
    >
      <div
        aria-description="header-wrapper"
        className={clsx("", {
          "flex items-center justify-between": true,
          "w-full md:w-[768px] lg:w-[1024px] mx-auto py-4": true,
        })}
      >
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
        <h1
          aria-description="header-label"
          className={clsx("font-mono", {
            "text-2xl font-bold": true,
            "md:text-3xl": true,
            "lg:font-extrabold": true,
          })}
        >
          <HeaderLink href="/">Todo</HeaderLink>
        </h1>

        <div className="flex items-center text-lg">
          <div className="flex gap-4">
            <GroupLink />
          </div>

          <div
            className={clsx("flex", {
              "ml-4 pl-4 border-l border-slate-300": true,
            })}
          >
            <HeaderLink href="https://github.com/richardnguyen99/todo">
              <MarkGithubIcon size={24} />
            </HeaderLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
