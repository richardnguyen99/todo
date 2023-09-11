"use client";

import * as React from "react";
import clsx from "classnames";
import {
  GrabberIcon,
  PencilIcon,
  PivotColumnIcon,
  PlusIcon,
} from "@primer/octicons-react";

export interface AppTaskProps {
  content: string;
  description?: string;
}

const AppTask: React.FC<AppTaskProps> = ({ content, description = "" }) => {
  return (
    <div
      className={clsx("", {
        "group pt-4": true,
        "border-t border-slate-200": true,
      })}
    >
      <div className="flex items-center w-full relative">
        <div
          className={clsx("group/button", {
            "absolute -left-10 top-0": true,
            "flex items-center justify-center": true,
            "w-8 h-8": true,
          })}
        >
          <div
            className={clsx("", {
              "flex items-center justify-center": true,
              "w-6 h-6 rounded-md": true,
              "group-hover:opacity-100 opacity-0": true,
              "group-hover/button:bg-slate-200": true,
              "transition-[opacity,_background] duration-200 ease-in-out": true,
              "group-hover/button:cursor-grab": true,
            })}
          >
            <GrabberIcon size={16} />
          </div>
        </div>
        <div className="w-6 h-full">
          <div
            className={clsx("w-4 h-4 rounded-full", {
              "bg-white border border-slate-700": true,
            })}
          />
        </div>
        <div className="ml-2 font-semibold">{content}</div>
        <div
          className={clsx("", {
            "flex items-center gap-2 ml-auto": true,
            "transition-opacity duration-200 ease-in-out": true,
            "opacity-0 group-hover:opacity-100": true,
          })}
        >
          <button
            className={clsx("", {
              "flex items-center justify-center": true,
              "p-2 rounded-md": true,
              "hover:bg-slate-100": true,
            })}
          >
            <PencilIcon size={16} />
          </button>
          <button
            className={clsx("", {
              "flex items-center justify-center": true,
              "p-2 rounded-md": true,
              "hover:bg-slate-100": true,
            })}
          >
            <PivotColumnIcon size={16} />
          </button>
          <button
            className={clsx("", {
              "flex items-center justify-center": true,
              "p-2 rounded-md": true,
              "hover:bg-slate-100": true,
            })}
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>
      <div
        className={clsx("", {
          "ml-8 mt-3": true,
          "block [word-break:_break-word]": true,
        })}
      >
        <p
          className={clsx("", {
            "text-sm max-h-[20px] leading-[20px]": true,
            "text-ellipsis": true,
            "line-clamp-1": true,
            "text-slate-600": true,
          })}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default AppTask;
