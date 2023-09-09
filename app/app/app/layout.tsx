"use client";

import * as React from "react";
import clsx from "classnames";
import { CalendarIcon, FilterIcon, RepoIcon } from "@primer/octicons-react";

import AppLink from "./components/app-link";
import type { AppLinkProps } from "./components/app-link";

const menuData: AppLinkProps[] = [
  {
    icon: () => <RepoIcon />,
    label: "Inbox",
    to: "/app",
    number: 0,
  },
  {
    icon: () => <CalendarIcon />,
    label: "Today",
    to: "/app/today",
    number: 0,
  },
  {
    icon: () => <FilterIcon />,
    label: "Labels",
    to: "/app/labels",
    number: 0,
  },
];

const AuthAppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div id="app_wrapper" className="w-full flex">
      <div
        className={clsx("flex", {
          "bg-indigo-50": true,
          "lg:w-[calc((100%_-_1024px)_/_2_-_8rem)]": true,
          "fixed top-12 left-0 bottom-0 z-50": true,
        })}
      >
        <div className="mt-12 ml-2 mr-2 flex flex-col w-full">
          <ul className="flex flex-col gap-1;">
            {menuData.map((item, i) => (
              <AppLink key={i} {...item} />
            ))}
          </ul>
          <div className="mt-8 pt-8 px-3 mx-3 border-t border-indigo-200">
            <div className="-mx-3">
              <h3>Add projects +</h3>
              <ul className="flex flex-col mt-2 ml-4">
                <li>Project 1</li>
                <li>Work</li>
                <li>School</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-end h-full my-6">
            <h1>Add workspace</h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[768px] lg:w-[1024px] mx-auto">
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
};

export default AuthAppLayout;
