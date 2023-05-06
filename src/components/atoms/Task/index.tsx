import React from "react";
import { Icon, Table } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/TodoList";

interface TaskProps {
    task: string;
    completed: boolean;
    time: string;
    id: string;
}

const Task: React.FC<TaskProps> = ({ task, completed, time, id }) => {

    const [isCompleted, setIsCompleted] = React.useState<boolean>(completed);

    const { tasks, setTasks } = React.useContext(ContextContainer) as ContextProps;

    const checkClass = isCompleted ? "check square" : "check square outline";

    // NOTE: Tasks should be able to be deleted if there are no tasks
    function handleClickEvent() {
        if (tasks && tasks?.length > 0) {
            const tempArray = [...tasks];
            const taskIndex: number = tempArray?.findIndex((object) => {
                return object.id === id
            })
            tempArray.splice(taskIndex, 1)
            setTasks(tempArray)
        }
    }

    return (
        <Table.Row className="task-content">
            <Table.HeaderCell>
                <Icon name={checkClass} onClick={() => {
                    if (tasks && tasks.length > 0) {
                        const tempArray = [...tasks]
                        const taskIndex: number = tasks?.findIndex((task) => {
                            return task.id === id
                        })
                        tempArray[taskIndex].completed = !isCompleted;
                        setTasks(tempArray);
                        
                        setIsCompleted(!isCompleted)
                    }
                }}/>
            </Table.HeaderCell>
            <Table.HeaderCell className={`task ${completed ? "completed" : ""}`}>
                {task}
                <span className="creation-date">Created at: {time}</span>
            </Table.HeaderCell>
            <Table.HeaderCell>
                <Icon name="close" onClick={handleClickEvent}/>
            </Table.HeaderCell>
        </Table.Row>
    );
};

export default React.memo(Task);