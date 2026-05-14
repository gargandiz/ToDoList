import {Button} from "./Button.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
}

// export const Todolist = (props: PropsType) => {
export const Todolist = ({ title, tasks }: PropsType) => {

    // const title = props.title
    // const tasks = props.tasks

    // const {title: title, tasks: tasks} = props
    // const {title, tasks} = props

    const tasksLists = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>{
            // props.tasks.map(t => {
            tasks.map(t => {
                return (
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                    </li>
                )
            })
        }
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+" />
            </div>
            {tasksLists}
            <div>
                <Button title="All" />
                <Button title="Active" />
                <Button title="Completed" />
            </div>
        </div>
    )
}

