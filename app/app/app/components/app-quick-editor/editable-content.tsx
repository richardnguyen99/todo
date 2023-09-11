"use client";

import * as React from "react";
import clsx from "classnames";

import { useAppQuickEditorContext } from "./context";

export interface AppEditableContentProps {
  initialContent: string;
}

type Props = React.HTMLAttributes<HTMLHeadingElement> & AppEditableContentProps;

const AppEditableContent: React.FC<Props> = ({ initialContent, ...rest }) => {
  const [content, setContent] = React.useState<string>(initialContent);
  const appEditorContext = useAppQuickEditorContext();

  const setAppContextContent = React.useCallback(
    (newContent: string) => {
      appEditorContext.dispatch({
        type: "SET_CONTENT",
        payload: {
          newContent,
        },
      });
    },
    [appEditorContext]
  );

  const handleBlur: React.FocusEventHandler<HTMLHeadElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();

        setAppContextContent(e.currentTarget.textContent ?? initialContent);
      },
      [initialContent, setAppContextContent]
    );

  // Load initial description to editor context
  React.useEffect(() => {
    setAppContextContent(initialContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h3
      {...rest}
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      className={clsx("", {
        "text-base font-semibold": true,
        "outline-none rounded-md": true,
        "px-1 py-1.5 border border-transparent": true,
        "focus-visible:border-slate-400": true,
      })}
    >
      {content}
    </h3>
  );
};

export default AppEditableContent;
