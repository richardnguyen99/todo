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
        "top-0 left-0 right-0 h-12": true,
        "fixed w-full z-50": true,
        "bg-indigo-500 text-white": true,
      })}
    >
      <div
        aria-description="header-wrapper"
        className={clsx("h-full", {
          "flex items-center justify-between": true,
          "w-full md:w-[768px] mx-auto py-2": true,
        })}
      >
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
        <h1
          aria-description="header-label"
          className={clsx("uppercase", {
            "text-lg font-bold": true,
          })}
        >
          <HeaderLink href="/">Todo</HeaderLink>
        </h1>

        <div className="flex items-center text-sm">
          <div className="flex gap-4 ">
            <GroupLink />
          </div>

          <div
            className={clsx("flex", {
              "ml-4 pl-4 border-l border-slate-300": true,
            })}
          >
            <a
              href="https://github.com/richardnguyen99/todo"
              className="px-1.5 py-1.5 hover:bg-indigo-600/75 rounded-md"
            >
              <MarkGithubIcon size={16} className="!block" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
