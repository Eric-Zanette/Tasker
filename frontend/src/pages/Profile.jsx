import UserContext from "../context/Users/UserContext"
import { useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import TasksContext from "../context/Tasks/TasksContext"


const Profile = () => {
  const {logout, user} = useContext(UserContext)
  const { tasks, fetchTasks } = useContext(TasksContext)
  

  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  },[user, navigate])

  if (!user){
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="profileContainer">
        <h1>{`Hello ${user.username}`}</h1>
        <h2>{`You Have ${Object.keys(tasks.filter((task) => !task.complete)).length} Tasks to Complete`}</h2>
        <h2>{`You Have Completed ${Object.keys(tasks.filter((task) => task.complete)).length} Tasks`}</h2>
        
        <button className="btn" onClick={()=>logout()}>
          Logout
        </button>
      </div>
    </>
  )
}

export default Profile