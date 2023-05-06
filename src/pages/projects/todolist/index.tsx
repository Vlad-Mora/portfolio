import React, { CSSProperties } from "react";

import TaskInput from "@atoms/TaskInput";
import TaskList from "@atoms/TaskList";

import { ContextContainer, ContextProps, IProject } from "@context/index";
import { ContextProvider } from "@context/TodoList";

const TodoList: React.FC = () => {

    const { projects } = React.useContext(ContextContainer) as ContextProps;
    const [currentPage, setCurrentPage] = React.useState<IProject | null>(null);

    React.useEffect(() => {
        projects.forEach((project) => {
            if (project.name == "Todo List") {
                setCurrentPage(project)
            }
        })
    }, [projects]);

    return (
        <ContextProvider>
            <div 
                className="todolist-page"
                style={{ 
                    "--primaryColour": currentPage?.colors.primaryColour,
                    "--secondaryColour": currentPage?.colors.secondaryColour,
                    "--accentColour": currentPage?.colors.accentColour 
                } as CSSProperties}
            >
                <div className="page-content">
                    <div className="page-header">TODO LIST</div>
                    <TaskInput/>
                    <TaskList/>
                </div>
            </div>
        </ContextProvider>
    );
};

export default React.memo(TodoList);