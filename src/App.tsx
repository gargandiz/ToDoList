import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CRUD -> GUI || CLI
// create
// read
// update
// delete

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL
    const todoListTitle_1: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Js/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (tasksID: string) => {
        setTasks(tasks.filter(t => t.id !== tasksID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
          id: v1(), title: title, isDone: false
        }
        // const copyState = [...tasks]
        // copyState.push(newTask)
        // setTasks(copyState)
        // или
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const updateTasks = tasks.map(t => {
            if(t.id === taskID) {
                return {...t, isDone: !t.isDone}
            }
            return t
        })
        setTasks(updateTasks)
        // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    //GUI
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle_1}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />   {/*TodoList(title:"What to learn") -> jsx -> html*/}
        </div>
    );
}

export default App;
