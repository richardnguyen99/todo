"use client";

import {
  KebabHorizontalIcon,
  MultiSelectIcon,
  ProjectIcon,
} from "@primer/octicons-react";
import * as React from "react";

const AuthApp = () => {
  return (
    <div>
      <div className="flex items-center w-full">
        <h1 className="text-2xl font-bold">All tasks</h1>
        <div className="ml-auto flex items-center text-sm gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-neutral-200">
            <ProjectIcon size={16} />
            <p>Views</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-neutral-200">
            <MultiSelectIcon size={16} />
            <p>Filter</p>
          </div>
          <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-md hover:bg-neutral-200">
            <KebabHorizontalIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthApp;
