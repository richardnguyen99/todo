"use client";

import * as React from "react";
import reducer, { AppQuickEditorActions, AppQuickEditorState } from "./reducer";

interface AppEditorContext {
  state: AppQuickEditorState;
  dispatch: React.Dispatch<AppQuickEditorActions>;
}

const initialState: AppQuickEditorState = {
  content: "",
  description: "",
  date: null,
  priority: 0,
  labels: [],
  reminder: null,
};

const AppQuicKEditorContext = React.createContext<AppEditorContext>(
  {} as AppEditorContext
);
AppQuicKEditorContext.displayName = "AppQuicKEditorContext";

const AppQuickEditorProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const memoValue = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <AppQuicKEditorContext.Provider value={memoValue}>
      {children}
    </AppQuicKEditorContext.Provider>
  );
};

export const useAppQuickEditorContext = () => {
  const context = React.useContext(AppQuicKEditorContext);

  if (!context) {
    throw new Error(
      "useAppQuickEditorContext must be used within an AppQuickEditorProvider"
    );
  }

  return context;
};

export default AppQuickEditorProvider;
