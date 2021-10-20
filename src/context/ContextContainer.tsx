import React from "react";

export interface ContextProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(0);

  return (
    <ContextContainer.Provider
      value={{
        pageNumber,
        setPageNumber,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
