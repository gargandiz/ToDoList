import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (tasksID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (filter: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

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

    const tasksJSXElements = tasksForRender.length   //условный рендеринг
        ? tasksForRender.map(t => {
                const removeTask = () => props.removeTask(t.id)
                const taskClasses = t.isDone ? "isDone" : "";
                return (
                    <li key={t.id}>--
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                        />
                        <span className={taskClasses}>{t.title}</span>
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
        const taskTitle = title.trim()
        if (taskTitle) { // 0, "", null, undefined, NaN => false
            props.addTask(taskTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownAddText = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const taskTitle = e.currentTarget.value.trim();
        setTitle(e.currentTarget.value)
        if(error && taskTitle)setError(false)

    }

const allBtnClasses = props.filter === "all" ? "active-filter" : "";
const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";
const errorInputStyle = error ? {border: "2px solid red", outline: "none"} : undefined;

return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input
                style={errorInputStyle}
                value={title} //контролируемый инпут
                // onChange={(e) => setTitle(e.currentTarget.value)} //это тоже, что и input.value
                // onKeyDown={(e)=> {if(e.key === "Enter")addTask()}} //или ... => e.key === "Enter" && addTask()}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddText}

            />
            <button onClick={addTask}>+</button>
            {error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}
        </div>
        <ul>
            {tasksJSXElements}
        </ul>
        <div>
            <button
                className={allBtnClasses}
                onClick={() => props.changeFilter("all")}>
                All
            </button>
            <button
                className={activeBtnClasses}
                onClick={changeFilter("active")}>
                Active
            </button>
            <button
                className={completedBtnClasses}
                onClick={changeFilter("completed")}>
                Completed
            </button>
        </div>
    </div>
);
}

export default TodoList;