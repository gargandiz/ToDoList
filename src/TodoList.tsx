import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (tasksID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (filter: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")

    const getTasksForRender = () => {
        let tasksForRender = props.tasks
        if (props.filter === "active") {
            tasksForRender = props.tasks.filter(t => !t.isDone)
        }
        if (props.filter === "completed") {
            tasksForRender = props.tasks.filter(t => t.isDone)
        }
        return tasksForRender
    }

    const tasksForRender = getTasksForRender()

    const tasksJSXElements = tasksForRender.length
        ? tasksForRender.map(t => {
                const removeTask = () => props.removeTask(t.id)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            }
        )
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onKeyDownAddText = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title} //контролируемый инпут
                    // onChange={(e) => setTitle(e.currentTarget.value)} //это тоже, что и input.value
                    // onKeyDown={(e)=> {if(e.key === "Enter")addTask()}} //или ... => e.key === "Enter" && addTask()}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddText}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={changeFilter("active")}>Active</button>
                <button onClick={changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;