import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./utilities.ts";

export type FilterValuesType = "all" | "active" | "completed"
function App() {
    console.log("App")
    //Data
    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: TaskType["id"]) => {
        const nextStateOfData: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextStateOfData)
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodoListFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="app">
            <Todolist title={todolistTitle}
                      tasks={getFilteredTasks(tasks, filter)}
                      deleteTask={deleteTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    )
}

export default App