"use client";

import * as React from "react";

interface AppContextState {
  editting: boolean;
}

interface AppContextData {}

interface AppContextActions {
  onEditting: (newState: boolean) => void;
}

interface AppContextProps {
  state: AppContextState;
  data: AppContextData;
  actions: AppContextActions;
}

const AppContext = React.createContext<AppContextProps>({
  state: {
    editting: false,
  },
  data: {},
  actions: {
    onEditting: (_newState: boolean) => {},
  },
});
AppContext.displayName = "AppContext";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<AppContextState>({
    editting: false,
  });

  const [data, setData] = React.useState<AppContextData>({});

  const onEditting = React.useCallback((newState: boolean) => {
    setState((prevState) => ({
      ...prevState,
      editting: newState,
    }));
  }, []);

  const memoValue = React.useMemo(
    () => ({
      state,
      data,
      actions: {
        onEditting,
      },
    }),
    [state, data, onEditting]
  );

  return (
    <AppContext.Provider value={memoValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => React.useContext(AppContext);
