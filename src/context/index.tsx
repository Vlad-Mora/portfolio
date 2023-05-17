import React from "react";

export interface IProject {
  name: string;
  href: string;
  colors: IProjectColor;
  disabled?: boolean;
}

interface IProjectColor {
  primaryColour: string;
  secondaryColour: string;
  accentColour: string;
}

export interface ContextProps {
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const projectsArray: IProject[] = [
    {
      name: "Vending Machine",
      href: "projects/vendingmachine",
      colors: {
        primaryColour: "#2a2b2d",
        secondaryColour: "#2da8d8",
        accentColour: "#d9514e",
      },
      disabled: true,
    },
    {
      name: "Todo List",
      href: "projects/todolist",
      colors: {
        primaryColour: "#f2bc94",
        secondaryColour: "#30110d",
        accentColour: "#722620",
      },
    },
    {
      name: "Coming Soon",
      href: "",
      colors: {
        primaryColour: "#a2d5c6",
        secondaryColour: "#077b8a",
        accentColour: "#5c3c92",
      },
    },
  ];

  const [projects, setProjects] = React.useState<IProject[]>(projectsArray);

  return (
    <ContextContainer.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
