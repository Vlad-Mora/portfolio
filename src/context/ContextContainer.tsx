import React from "react";

export interface ContextProps {}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <ContextContainer.Provider value={{}}>{children}</ContextContainer.Provider>
  );
};
