"use client";

import * as React from "react";
import clsx from "classnames";

import { useAppContext } from "../../context";
import AppEditableContent from "./editable-content";
import AppEditableDescription from "./editable-description";
import AppDueDateButton from "./option-due-button";
import AppPriorityButton from "./option-priority-button";
import AppLabelButton from "./option-label-button";
import AppReminderButton from "./option-reminder-button";
import SaveButton from "./save-button";

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
      <div className="mb-4 flex flex-col gap-2">
        <AppEditableContent initialContent="Task" />
        <AppEditableDescription initialDescription="Description" />
      </div>
      <div
        className={clsx("", {
          "flex items-center": true,
          "gap-3": true,
        })}
      >
        <AppDueDateButton />
        <AppPriorityButton />
        <AppReminderButton />
        <AppLabelButton />

        <SaveButton />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AppQuickEditor;
