"use client";

import {
  KebabHorizontalIcon,
  MultiSelectIcon,
  ProjectIcon,
} from "@primer/octicons-react";
import * as React from "react";
import AppTask from "./components/app-task";

const AuthApp = () => {
  return (
    <div>
      <div className="flex items-center w-full">
        <h1 className="text-2xl font-bold">All tasks</h1>
        <div className="ml-auto flex items-center text-sm gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
          >
            <ProjectIcon size={16} />
            <p>Views</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
          >
            <MultiSelectIcon size={16} />
            <p>Filter</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-1.5 py-1.5 rounded-md hover:bg-slate-100"
          >
            <KebabHorizontalIcon size={16} />
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <AppTask content="Test" description="Some test" />
        <AppTask content="Test" description="Some test" />
        <AppTask content="Test" description="Some test" />
        <AppTask content="Test" description="Some test" />
      </div>
    </div>
  );
};

export default AuthApp;
