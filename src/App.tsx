import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./utilities.ts";
import {v1} from "uuid";
import {TaskType, TodolistType} from "./types.ts";

export type FilterValuesType = "all" | "active" | "completed"

//var_1
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }

//var_2
export type TasksStateType = Record<string, TaskType[]>


const todolist1 = v1();
const todolist2 = v1();


function App() {


    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'active'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'tomato', isDone: false},
        ],
    })


    const deleteTask = (taskId: TaskType["id"], todolistId: string) => {
        const filteredTasks = tasks[todolistId].filter(task => task.id !== taskId);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    const createTask = (title: TaskType["title"], todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const newTasks = [...tasks[todolistId], newTask]
        setTasks({...tasks, [todolistId]: newTasks});
    }

    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: string) => {
        const newTasks= tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks({...tasks, [todolistId]: newTasks});
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map((tl) => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists);
    }

    const removeTodolist = (todolistId: string) => {
        const filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(filteredTodolists);
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    return (
        <div className="app">

            {
                todolists.map((tl) => {

                    return (
                        <Todolist key={tl.id}
                                  todolist={tl}
                                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                                  deleteTask={deleteTask}
                                  changeTodoListFilter={changeTodoListFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })
            }


        </div>
    )
}

export default App