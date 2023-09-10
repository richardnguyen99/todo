"use client";

import * as React from "react";
import clsx from "classnames";

import { useAppContext } from "../../context";
import {
  CheckIcon,
  MilestoneIcon,
  MultiSelectIcon,
  PivotColumnIcon,
  StopwatchIcon,
  TagIcon,
} from "@primer/octicons-react";

const AppQuickEditor: React.FC = () => {
  const appContext = useAppContext();

  return appContext.state.editting ? (
    <div
      className={clsx("", {
        "rounded-lg p-3": true,
        "border border-slate-300": true,
        "text-sm": true,
      })}
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold">Content</h3>
        <p className="text-slate-400 mt-2">Description</p>
      </div>
      <div
        className={clsx("", {
          "flex items-center": true,
          "gap-3": true,
        })}
      >
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 "
        >
          <PivotColumnIcon size={16} />
          <p>Due dates</p>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
        >
          <MilestoneIcon size={16} />
          <p>Priorities</p>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
        >
          <StopwatchIcon size={16} />
          <p>Reminders</p>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
        >
          <TagIcon size={16} />
          <p>Labels</p>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 ml-auto rounded-md bg-green-500 hover:bg-green-600 border border-emerald-500 text-white font-semibold"
        >
          <CheckIcon size={16} />
          <p>Save</p>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AppQuickEditor;
