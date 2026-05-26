import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";
import {useRef} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    totalTasksCount: number,
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
}

// export const Todolist = (props: PropsType) => {
export const Todolist = ({ title,
                           totalTasksCount,
                           tasks,
                           deleteTask,
                           createTask,
                           changeTodoListFilter
}: PropsType) => {

    // const title = props.title
    // const tasks = props.tasks

    // const {title: title, tasks: tasks} = props
    // const {title, tasks} = props

    const storageForInputReference = useRef<HTMLInputElement>(null)

    const tasksLists = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>{
            // props.tasks.map(t => {
            tasks.map(t => {
                return (
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title="x" onClick={ ()=>deleteTask(t.id) }/>
                    </li>
                )
            })
        }
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            {totalTasksCount}
            <div>
                <input ref={storageForInputReference}/>
                <Button title="+" onClick={() => {
                    if (storageForInputReference.current) {
                        createTask(storageForInputReference.current.value)
                        storageForInputReference.current.value = ""
                    }
                }} />
            </div>
            {tasksLists}
            <div>
                <Button
                    title="All"
                    onClick={() => {changeTodoListFilter("all")}}
                />
                <Button
                    title="Active"
                    onClick={() => {changeTodoListFilter("active")}
                    }/>
                <Button
                        title="Completed"
                        onClick={() => {changeTodoListFilter("completed")}
                        }/>
            </div>
        </div>
    )
}

