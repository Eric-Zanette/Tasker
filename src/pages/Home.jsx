import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { useEffect, useContext } from "react"
import TasksContext from "../context/Tasks/TasksContext"
import UserContext from "../context/Users/UserContext"

const Home = () => {
  const {fetchTasks} = useContext(TasksContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    fetchTasks()
    console.log(user)
  }, [])



  return (
    <div className="container">
      <div className="taskContainer">
      {user != null ? (
          <>
            <TaskForm />
            <TaskList />
          </>
        ) : (
          <h1 className="loginToSee">Login to See Tasks!</h1>
        )}
      </div>
    </div>
  )
}

export default Home