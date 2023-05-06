import React from "react";
import { Button, Table } from "semantic-ui-react";

import Task from "@atoms/Task";

import { ContextContainer, ContextProps } from "@context/TodoList";

const TaskList: React.FC = () => {

    const { tasks } = React.useContext(ContextContainer) as ContextProps;

    const [filteredTasks, setFilteredTasks] = React.useState(tasks);
    const [filterMode, setFilterMode] = React.useState<string>("all");

    function setFilter() {
        if (filterMode === "todo") {
            const tempArray = tasks?.filter(function(task) {
                return task.completed === false
            })
            setFilteredTasks(tempArray)
        } else if (filterMode === "completed") {
            const tempArray = tasks?.filter(function(task) {
                return task.completed === true
            })
            setFilteredTasks(tempArray)
        } else if (filterMode === "all") {
            setFilteredTasks(tasks)
        }
    }

    React.useEffect(() => {
        if (filterMode === "") {
            const storageFilterMode = localStorage.getItem("filter-mode") ?? "";
            setFilterMode(JSON.parse(storageFilterMode))
        } else {
            localStorage.setItem("filter-mode", JSON.stringify(filterMode))
        }
    }, [filterMode])
    
    React.useEffect(() => setFilter(), [filterMode, tasks])

    return (
        <>
        <div className="filter-buttons">
            <Button className={`${filterMode === "todo" ? "selected" : ""}`} content="todo" onClick={() => setFilterMode("todo")}/>
            <Button className={`${filterMode === "completed" ? "selected" : ""}`} content="completed" onClick={() => setFilterMode("completed")}/>
            <Button className={`${filterMode === "all" ? "selected" : ""}`} content="all" onClick={() => setFilterMode("all")}/>
        </div>
        <div className="task-list-table">
            <Table className="table">
                <Table.Header className="table-header noselect">
                    <Table.Row>
                        <Table.HeaderCell className="column-header">
                            Completed
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Task
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Delete
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className="table-body">
                    {filteredTasks?.map((task) =>
                        <Task task={task.task} completed={task.completed} time={task.time} id={task.id} key={task.id}/>
                    )}
                </Table.Body>
            </Table>
        </div>
        </>
    );
};

export default React.memo(TaskList);