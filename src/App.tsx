import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";

function App() {

    const todolist_1 = "What to learn"
    const todolist_2 = "What to read"
    const todolist_3 = "What to buy"

    const tasks_1: TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    const tasks_2: TaskType[] = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false},
    ]

    const tasks_3: TaskType[] = []


return (
    <div className="app">
        <Todolist title={todolist_1} tasks={tasks_1}/>
        <Todolist title={todolist_2} tasks={tasks_2}/>
        {Todolist({title: todolist_3, tasks: tasks_3})}
    </div>
)
}

export default App
