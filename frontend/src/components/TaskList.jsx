import { useContext, useEffect, useState } from "react"
import TasksContext from "../context/Tasks/TasksContext"
import TaskItem from "./TaskItem"

const TaskList = () => {
    const[completeTasks, setCompleteTasks] = useState([])
    const[incompleteTasks, setIncompleteTasks] = useState([])

    const {tasks, isLoading, setIsLoading} = useContext(TasksContext)

    useEffect(() => {
        sortTasks('finishBy')
    }, [tasks])
    
    const sortTasks = (sorter) => {
        setIsLoading(true)
        const newTasks = [...tasks].sort((a, b) => {
            if(sorter ==='finsihBy' || sorter == 'posted'){
                return new Date(a[sorter]) - new Date(b[sorter])
            } else {
                return a.title.localeCompare(b.title)
            }
            
        })
        setCompleteTasks([...newTasks].filter((task) => task.complete))
        setIncompleteTasks([...newTasks].filter((task) => !task.complete))
    }


    return (
        <div className="taskList">

            <div className="mainSortTitleContainer">
                <h1 className="listTitle one">To-Do List</h1>

                <select className="sorter" name="sort" onChange={(e) => sortTasks(e.target.value)}>
                    <option value="finishBy">Complete date</option>
                    <option value="posted">Date posted</option>
                    <option value="title">A - Z</option>
                </select>
            </div>

            {/* To-do List */}
            {Object.keys(incompleteTasks).length === 0 
            ? 
            <h2 className="noTasks">No Tasks on Your To-Do List!</h2> 
            : 
            incompleteTasks
                .map((task) => <TaskItem task={task}/>)}

            {/* Completed Tasks */}
            <h1 className="listTitle two">Completed Tasks</h1>
            {Object.keys(completeTasks).length === 0 
            ? 
            <h2 className="noTasks">No Tasks Have Been Completed</h2> 
            : 
            completeTasks
                .map((task) => <TaskItem task={task}/>)}
        </div>
    )
}

export default TaskList