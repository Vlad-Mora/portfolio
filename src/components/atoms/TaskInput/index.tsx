import React from "react";
import { Icon, Input } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

import { ContextContainer, ContextProps } from "@context/TodoList";

const TaskInput: React.FC = () => {

    const { tasks, setTasks } = React.useContext(ContextContainer) as ContextProps;

    const [taskInput, setTaskInput] = React.useState<string>("");
    const [submitButtonClass, setSubmitButtonClass] = React.useState<string>("hidden");

    function eventListener(event: any) {
        if (event.key === "Enter" || event === "Enter") {
            const dateAndTime = (new Date()).toLocaleString();

            if (taskInput.length == 0) return 
            
            if (tasks && tasks.length > 0) {
                setTasks([...tasks, {
                    task: taskInput,
                    completed: false,
                    time: dateAndTime,
                    id: uuidv4()
                }])
            } else {
                setTasks([{
                    task: taskInput,
                    completed: false,
                    time: dateAndTime,
                    id: uuidv4()
                }])
            }

            setTaskInput("");
        }
    }

    return (
        <div className="task-input">
            <Input
                className="input-bar"
                placeholder="Enter your next task"
                onKeyUp={eventListener}
                onChange={(_, data) => {
                    setTaskInput(data.value)
                    if (data.value.length > 0) {
                        setSubmitButtonClass("")
                    } else {
                        setSubmitButtonClass("hidden")
                    }
                }}
                value={taskInput}
            />
            <Icon.Group
                size="large"
                className={`submitButton ${submitButtonClass}`}
                name="plus"
                onClick={() => eventListener("Enter")}
            >
                <Icon name="clipboard"/>
                <Icon corner="bottom right" name='add'/>
            </Icon.Group>
        </div>
    );
};

export default React.memo(TaskInput);