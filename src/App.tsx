import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

//CRUD -> GUI || CLI
// create
//read
//update
//delete

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "Js/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const todoListTitle_1 = "What to learn"

    const removeTask = (tasksID: number) => {
        setTasks(tasks.filter(t => t.id !== tasksID))
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
            />   {/*TodoList(title:"What to learn") -> jsx -> html*/}
        </div>
    );
}

export default App;
