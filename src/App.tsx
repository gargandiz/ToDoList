import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useRef, useState} from "react";
import {getFilteredTasks} from "./utilities.ts";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
function App() {

    let storageForCountCreatedTasks = useRef<number>(3)
    //Data
    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: TaskType["id"]) => {
        const nextStateOfData: TaskType[] = tasks.filter(t => t.id !== taskId);
        setTasks(nextStateOfData);
        storageForCountCreatedTasks.current += 1;
    }

    const createTask = (title: TaskType["title"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextStateOfData: TaskType[] = [...tasks, newTask]
        setTasks(nextStateOfData)
        storageForCountCreatedTasks.current += 1;
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodoListFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="app">
            <Todolist title={todolistTitle}
                      totalTasksCount={storageForCountCreatedTasks.current}
                      tasks={getFilteredTasks(tasks, filter)}
                      deleteTask={deleteTask}
                      changeTodoListFilter={changeTodoListFilter}
                      createTask={createTask}
            />
        </div>
    )
}

export default App