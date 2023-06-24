import { useContext, useEffect } from "react"
import TasksContext from "./context/context/TasksContext"
import TaskItem from "./TaskItem"

const TaskList = () => {
    const {tasks} = useContext(TasksContext)

    return (
        <div className="taskList">
            {tasks.map((task) => <TaskItem task={task}/>)}
        </div>
    )
}

export default TaskList