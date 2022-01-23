import { ItemProps } from "@interfaces/items";
import React from "react";

export interface ContextProps {
  // HackerRank
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  // Spotify Clone
  spotifyLoggedIn: boolean;
  setSpotifyLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // Vending Machine
  currentBalance: number;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number>>;
  totalCost: number;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  insertAmount: string;
  setInsertAmount: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  items: ItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  // HackerRank
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  // Spotify Clone
  const [spotifyLoggedIn, setSpotifyLoggedIn] = React.useState<boolean>(false);
  // Vending Machine
  const itemsCount = 30;
  const tempArray: ItemProps[] = [];
  for (let i = 1; i <= itemsCount; i++) {
    const lengthDifference = 3 - i.toString().length;
    const code = "0".repeat(lengthDifference) + i;

    tempArray.push({
      code: code,
      price: i,
    });
  }
  const [items, setItems] = React.useState<ItemProps[]>(tempArray);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [insertAmount, setInsertAmount] = React.useState<string>("0");
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [currentBalance, setCurrentBalance] = React.useState<number>(0);

  return (
    <ContextContainer.Provider
      value={{
        // HackerRank
        pageNumber,
        setPageNumber,
        // Spotify Clone
        spotifyLoggedIn,
        setSpotifyLoggedIn,
        // Vending Machine
        currentBalance,
        setCurrentBalance,
        insertAmount,
        setInsertAmount,
        items,
        setItems,
        selectedItems,
        setSelectedItems,
        totalCost,
        setTotalCost,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
