import React from "react";

import { UserProps, UserCartProps } from "@interfaces/TravelAgency";
import { ItemProps } from "@interfaces/VendingMachine";
import { TripItemProps } from "@interfaces/TravelAgency";

export interface ContextProps {
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

  // Travel Agency
  user: UserProps | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  userCart: UserCartProps[] | undefined;
  setUserCart: React.Dispatch<
    React.SetStateAction<UserCartProps[] | undefined>
  >;
  selectedRow: TripItemProps | undefined;
  setSelectedRow: React.Dispatch<
    React.SetStateAction<TripItemProps | undefined>
  >;
  data: Record<string, any> | undefined;
  setData: React.Dispatch<
    React.SetStateAction<Record<string, any> | undefined>
  >;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
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

  // Travel Agency
  const [user, setUser] = React.useState<UserProps | undefined>();
  const [userCart, setUserCart] = React.useState<UserCartProps[] | undefined>();
  const [selectedRow, setSelectedRow] = React.useState<
    TripItemProps | undefined
  >();
  const [data, setData] = React.useState<Record<string, any> | undefined>();

  return (
    <ContextContainer.Provider
      value={{
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

        // Travel Agency
        user,
        setUser,
        userCart,
        setUserCart,
        selectedRow,
        setSelectedRow,
        data,
        setData,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
