import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";
import {useState} from "react";
import {TaskType, TodolistType} from "./types.ts";

type PropsType = {
    todolist: TodolistType
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"], todolistId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    createTask: (title: TaskType["title"], todolistId: string) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

// export const Todolist = (props: PropsType) => {
export const Todolist = ({
                             todolist,
                             tasks,
                             deleteTask,
                             createTask,
                             changeTodoListFilter,
                             changeTaskStatus,
                             removeTodolist,
                         }: PropsType) => {


    const [titleInput, setTitleInput] = useState("")
    const [error, setError] = useState(false)

    const tasksLists = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>{
            // props.tasks.map(t => {
            tasks.map(task => {
                return (
                    <li>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={e => changeTaskStatus(task.id, e.currentTarget.checked, todolist.id)}
                        />
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title="x" onClick={() => deleteTask(task.id, todolist.id)}/>
                    </li>
                )
            })
        }
        </ul>

    const createTaskHandler = () => {
        const title = titleInput.trim();
        if (title !== "") {
            createTask(titleInput, todolist.id)
        } else {
            setError(true);
        }
        setTitleInput("")
    }

    const isTitleValid = titleInput.length > 0 && titleInput.length <= 10;

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{todolist.title}</h3>
                <Button title={'x'} onClick={removeTodolistHandler} />
            </div>

            <div>
                <input
                    value={titleInput}
                    onChange={e => {
                        error && setError(false)
                        setTitleInput(e.currentTarget.value)
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter" && isTitleValid) {
                            createTaskHandler()
                        }
                    }}
                    className={error ? "error" : ""}
                />
                <Button
                    title="+"
                    disabled={!isTitleValid}
                    onClick={createTaskHandler}
                />
                {!error && titleInput.length === 0 && <div>Enter task title</div>}
                {!error && isTitleValid && <div>Max title length 10 charters </div>}
                {!error && titleInput.length > 10 && <div style={{color: "red"}}>Title is too long </div>}
                {error && <div style={{color: "red"}}>Enter valid title </div>}

            </div>
            {tasksLists}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodoListFilter("all", todolist.id)}
                    className={todolist.filter === "all" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodoListFilter("active", todolist.id)}
                    className={todolist.filter === "active" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodoListFilter("completed", todolist.id)}
                    className={todolist.filter === "completed" ? "filter__btn-active" : ""}
                />
            </div>
        </div>
    )
}

