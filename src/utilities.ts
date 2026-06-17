import {TaskType} from "./types.ts"
import {FilterValuesType} from "./App.tsx";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    // switch (filter) {
    //     case "active":
    //         return tasks.filter(t => !t.isDone)
    //     case "completed":
    //         return tasks.filter(t => t.isDone)
    //     default:
    //         return tasks
    // }

    return filter === "active"
        ? tasks.filter(t => !t.isDone)
        : filter === "completed"
            ? tasks.filter(t => t.isDone)
            : tasks
}