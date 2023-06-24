import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { useContext, useEffect } from "react"
import TasksContext from "../context/Tasks/TasksContext"

const Home = () => {
  const {fetchTasks} = useContext(TasksContext)

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="container">
      <div className="taskContainer">
        <TaskForm/>
        <TaskList/>
      </div>
    </div>
  )
}

export default Home