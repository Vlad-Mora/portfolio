import React from "react";

export interface ITaskProps {
  task: string;
  completed: boolean;
  time: string;
  id: string;
}

export interface ContextProps {
  tasks: ITaskProps[] | undefined;
  setTasks: React.Dispatch<React.SetStateAction<ITaskProps[] | undefined>>;
}

export const ContextContainer = React.createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [tasks, setTasks] = React.useState<ITaskProps[] | undefined>();

  React.useEffect(() => {
    if (tasks === undefined) {
      const storageFilterMode = localStorage.getItem("tasks") ?? "[]";
      if (storageFilterMode !== "[]") {
        setTasks(JSON.parse(storageFilterMode));
      } else {
        setTasks([]);
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <ContextContainer.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </ContextContainer.Provider>
  );
};
