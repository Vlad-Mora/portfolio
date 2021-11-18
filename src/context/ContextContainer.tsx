import React from "react";

export interface ContextProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;

  spotifyLoggedIn: boolean;
  setSpotifyLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [spotifyLoggedIn, setSpotifyLoggedIn] = React.useState<boolean>(false);

  return (
    <ContextContainer.Provider
      value={{
        pageNumber,
        setPageNumber,
        spotifyLoggedIn,
        setSpotifyLoggedIn
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
