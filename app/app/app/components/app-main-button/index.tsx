"use client";

import * as React from "react";
import clsx from "classnames";
import { FeedPlusIcon, XCircleFillIcon } from "@primer/octicons-react";

import { useAppContext } from "../../context";

const AppMainButton: React.FC = () => {
  const appContext = useAppContext();

  const handleClick = React.useCallback(() => {
    appContext.actions.onEditting(!appContext.state.editting);
  }, [appContext.actions, appContext.state.editting]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx("", {
        "flex items-center justify-center gap-2 px-3 py-2": true,
        "rounded-md text-white font-semibold": true,
        "bg-indigo-500 hover:bg-indigo-600": !appContext.state.editting,
        "bg-rose-500 hover:bg-rose-600": appContext.state.editting,
      })}
    >
      {appContext.state.editting ? (
        <>
          <XCircleFillIcon size={16} className="fill-white" />
          Cancel
        </>
      ) : (
        <>
          <FeedPlusIcon size={16} className="fill-white" />
          Add
        </>
      )}
    </button>
  );
};

export default AppMainButton;
