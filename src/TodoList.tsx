import React from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (tasksID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    let tasksForRender = props.tasks
    if (props.filter === "active") {
        tasksForRender = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForRender = props.tasks.filter(t => t.isDone)
    }

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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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