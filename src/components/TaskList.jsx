import { useContext, useEffect } from "react"
import TasksContext from "../context/Tasks/TasksContext"
import TaskItem from "./TaskItem"

const TaskList = () => {
    const {tasks} = useContext(TasksContext)

    const completedTasks = tasks.filter((task) => task.complete)
    const incompleteTasks = tasks.filter((task) => !task.complete)


    return (
        <div className="taskList">
            <h1 className="listTitle one">To-Do List</h1>
            {Object.keys(incompleteTasks).length === 0 ? <h2 className="noTasks">No Tasks on Your To-Do List!</h2> : 
            incompleteTasks.map((task) => <TaskItem task={task}/>)}
       
            <h1 className="listTitle two">Completed Tasks</h1>
            {Object.keys(completedTasks).length === 0 ? <h2 className="noTasks">No Tasks Have Been Completed</h2> : 
            completedTasks.map((task) => <TaskItem task={task}/>)}
        </div>
    )
}

export default TaskList