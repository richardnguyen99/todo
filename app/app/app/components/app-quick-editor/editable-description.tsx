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

  const [description, setDescription] =
    React.useState<string>(initialDescription);

  const handleDescriptionChange: React.FormEventHandler<HTMLParagraphElement> =
    React.useCallback((e) => {
      e.preventDefault();

      const newDescription = e.currentTarget.textContent || "";
      setDescription(newDescription);
    }, []);

  const handleBlur: React.FocusEventHandler<HTMLParagraphElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();

        appEditorContext.handleDescriptionChange(description);
      },
      [appEditorContext, description]
    );

  // Load initial description to editor context
  React.useEffect(() => {
    appEditorContext.handleDescriptionChange(description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p
      contentEditable
      onChange={handleDescriptionChange}
      onBlur={handleBlur}
      className={twMerge(
        clsx("", {
          "text-sm font-normal text-slate-600": true,
        }),
        _className
      )}
    >
      {description}
    </p>
  );
};

export default AppEditableDescription;
