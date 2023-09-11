"use client";

import * as React from "react";
import { StopwatchIcon } from "@primer/octicons-react";

import AppCoreOptionButton from "./core-option-button";

const AppReminderButton: React.FC = () => {
  const onChangeCallback = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log("Stopwatch button clicked");
    },
    []
  );

  return (
    <AppCoreOptionButton onClick={onChangeCallback}>
      <StopwatchIcon size={16} />
      <p>Reminder</p>
    </AppCoreOptionButton>
  );
};

export default AppReminderButton;
