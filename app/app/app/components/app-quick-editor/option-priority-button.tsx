"use client";

import * as React from "react";
import { MilestoneIcon } from "@primer/octicons-react";

import AppCoreOptionButton from "./core-option-button";

const AppPriorityButton: React.FC = () => {
  const onChangeCallback = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log("Priority button clicked");
    },
    []
  );

  return (
    <AppCoreOptionButton onClick={onChangeCallback}>
      <MilestoneIcon size={16} />
      <p>Priorities</p>
    </AppCoreOptionButton>
  );
};

export default AppPriorityButton;
