import * as React from "react";

const AppContext = React.createContext({});
AppContext.displayName = "AppContext";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
