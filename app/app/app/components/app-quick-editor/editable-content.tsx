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

  const handleContentChange: React.FormEventHandler<HTMLHeadElement> =
    React.useCallback((e) => {
      e.preventDefault();

      const newContent = e.currentTarget.textContent || "";
      setContent(newContent);
    }, []);

  const handleBlur: React.FocusEventHandler<HTMLHeadElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();

        appEditorContext.handleContentChange(content);
      },
      [appEditorContext, content]
    );

  // Load initial description to editor context
  React.useEffect(() => {
    appEditorContext.handleContentChange(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h3
      {...rest}
      contentEditable
      onChange={handleContentChange}
      onBlur={handleBlur}
      className={clsx("", {
        "text-base font-semibold": true,
      })}
    >
      {content}
    </h3>
  );
};

export default AppEditableContent;
