import React from "react";

export interface ContextProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  feedbackMessage: string;
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [balance, setBalance] = React.useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] =
    React.useState<string>("Insert coins");

  return (
    <ContextContainer.Provider
      value={{
        balance,
        setBalance,
        feedbackMessage,
        setFeedbackMessage,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
