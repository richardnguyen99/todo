"use client";

import * as React from "react";
import clsx from "classnames";
import { twMerge } from "tailwind-merge";

import { useAppQuickEditorContext } from "./context";

export interface AppEditableDescriptionProps {
  initialDescription: string;
}

type Props = React.HTMLAttributes<HTMLParagraphElement> &
  AppEditableDescriptionProps;

const AppEditableDescription: React.FC<Props> = ({
  initialDescription,
  className: _className,
  ...rest
}) => {
  const appEditorContext = useAppQuickEditorContext();

  const setAppContextDescription = React.useCallback(
    (newDescription: string) => {
      appEditorContext.dispatch({
        type: "SET_DESCRIPTION",
        payload: {
          newDescription,
        },
      });
    },
    [appEditorContext]
  );

  const handleBlur: React.FocusEventHandler<HTMLParagraphElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();

        setAppContextDescription(
          e.currentTarget.textContent ?? initialDescription
        );
      },
      [initialDescription, setAppContextDescription]
    );

  // Load initial description to editor context
  React.useEffect(() => {
    setAppContextDescription(initialDescription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={twMerge(
        clsx("", {
          "text-sm font-normal text-slate-600": true,
        }),
        _className
      )}
    >
      {initialDescription}
    </p>
  );
};

export default AppEditableDescription;
