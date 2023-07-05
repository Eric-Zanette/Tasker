import{createContext, useState, useContext} from 'react'
import UserContext from '../Users/UserContext'
import axios from 'axios'

const TasksContext = createContext()

export const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const {user} = useContext(UserContext)

  const localToken = localStorage.getItem('user')
  axios.defaults.headers.common['Authorization'] = localToken


  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      if(user) {
        const response = await axios.get('http://localhost:5000/api/tasks')
        setTasks(response.data)
        }
    } catch(error) {
      console.log(error)
      setTasks([])
    }
    setIsLoading(false)
  }

  const addTask = async (task) => {
    try {
      if(user) {
        await axios.post('http://localhost:5000/api/tasks', task)
        fetchTasks()
        }
    } catch(error) {
      console.log(error)
    }
  }

  const editTask = async (task) => {
    try {
      if(user) {
        await axios.post(`http://localhost:5000/api/tasks/${task._id}`, task)
        fetchTasks()
        }
    } catch(error) {
      console.log(error)
    }
  }

  const deleteTask = async (task) => {
    try{
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`)
      fetchTasks()
    } catch(error){
      console.log(error)
    }
    
  }


  return (
    <TasksContext.Provider value={{tasks, fetchTasks, addTask, editTask, deleteTask, isLoading, setIsLoading}}>
        {children}
    </TasksContext.Provider>
    
  )
}

export default TasksContext