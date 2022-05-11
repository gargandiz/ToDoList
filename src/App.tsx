import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CRUD -> GUI || CLI
// create
//read
//update
//delete

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Js/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const todoListTitle_1 = "What to learn"

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
            />   {/*TodoList(title:"What to learn") -> jsx -> html*/}
        </div>
    );
}

export default App;
