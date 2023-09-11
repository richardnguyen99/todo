"use client";

import * as React from "react";
import { PivotColumnIcon } from "@primer/octicons-react";

import AppCoreOptionButton from "./core-option-button";

const AppDueDateButton: React.FC = () => {
  const onChangeCallback = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log("Due date button clicked");
    },
    []
  );

  return (
    <AppCoreOptionButton onClick={onChangeCallback}>
      <PivotColumnIcon size={16} />
      <p>Due dates</p>
    </AppCoreOptionButton>
  );
};

export default AppDueDateButton;
