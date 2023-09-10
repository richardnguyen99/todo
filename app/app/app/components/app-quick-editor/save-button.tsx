"use client";

import * as React from "react";
import { CheckIcon } from "@primer/octicons-react";

import { useAppQuickEditorContext } from "./context";

const SaveButton: React.FC = () => {
  const editorContext = useAppQuickEditorContext();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        editorContext.dispatch({
          type: "RESET",
        });
      },
      [editorContext]
    );

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 px-2 py-1 ml-auto rounded-md bg-green-500 hover:bg-green-600 border border-emerald-500 text-white font-semibold"
    >
      <CheckIcon size={16} />
      <p>Save</p>
    </button>
  );
};

export default SaveButton;
