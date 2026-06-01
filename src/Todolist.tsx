import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";
import {useState} from "react";
import {TaskType} from "./types.ts";

type PropsType = {
    totalTasksCount: number,
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
    changeTaskStatus:(taskId: TaskType["id"], isDone: TaskType["isDone"]) => void
}

// export const Todolist = (props: PropsType) => {
export const Todolist = ({
                           title,
                           totalTasksCount,
                           tasks,
                           filter,
                           deleteTask,
                           createTask,
                           changeTodoListFilter,
                           changeTaskStatus
}: PropsType) => {

    // const title = props.title
    // const tasks = props.tasks

    // const {title: title, tasks: tasks} = props
    // const {title, tasks} = props

    const [titleInput, setTitleInput] = useState("")
    const [error, setError] = useState(false)

    const tasksLists = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>{
            // props.tasks.map(t => {
            tasks.map(t => {
                return (
                    <li>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={e => changeTaskStatus(t.id, e.currentTarget.checked)}
                        />
                        <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
                        <Button title="x" onClick={ ()=>deleteTask(t.id) }/>
                    </li>
                )
            })
        }
        </ul>

    const createTaskHandler = () => {
        const title = titleInput.trim();
        if (title !== "") {
            createTask(titleInput)
        } else {
            setError(true);
        }
        setTitleInput("")
    }

    const isTitleValid = titleInput.length > 0 && titleInput.length <= 10;

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input
                    value={titleInput}
                    onChange={e => {
                        error && setError(false)
                        setTitleInput(e.currentTarget.value)
                    }}
                    onKeyDown={e => {
                        if(e.key === "Enter" && isTitleValid) {
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
                <span style={{marginLeft: "20px", fontWeight:"bold"}}>{totalTasksCount}</span>
                {!error && titleInput.length === 0 && <div>Enter task title</div>}
                {!error && isTitleValid && <div>Max title length 10 charters </div>}
                {!error && titleInput.length > 10 && <div style={{color: "red"}}>Title is too long </div>}
                {error && <div style={{color: "red"}}>Enter valid title </div>}

            </div>
            {tasksLists}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodoListFilter("all")}
                    className={filter === "all" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodoListFilter("active")}
                    className={filter === "active" ? "filter__btn-active" : ""}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodoListFilter("completed")}
                    className={filter === "completed" ? "filter__btn-active" : ""}
                />
            </div>
        </div>
    )
}

