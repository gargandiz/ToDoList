import React from 'react';
import './App.css';
import TodoList from "./TodoList";

//CRUD -> GUI || CLI
// create
//read
//update
//delete

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to bye"
    const todoListTitle_3 = "What to read"
    const tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "Js/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={tasks}
            />   {/*TodoList(title:"What to learn") -> jsx -> html*/}
            <TodoList
                title={todoListTitle_2}
                tasks={tasks}
            />
            <TodoList
                title={todoListTitle_3}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
