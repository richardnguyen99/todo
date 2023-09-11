"use client";

import * as React from "react";
import { TagIcon } from "@primer/octicons-react";

import AppCoreOptionButton from "./core-option-button";

const AppLabelButton: React.FC = () => {
  const onChangeCallback = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log("Label button clicked");
    },
    []
  );

  return (
    <AppCoreOptionButton onClick={onChangeCallback}>
      <TagIcon size={16} />
      <p>Labels</p>
    </AppCoreOptionButton>
  );
};

export default AppLabelButton;
