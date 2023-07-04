import{createContext, useState, useContext, useEffect } from 'react'
import UserContext from '../Users/UserContext'
import axios from 'axios'

const TasksContext = createContext()

export const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState([])

  const {user} = useContext(UserContext)


  const fetchTasks = async () => {
    try {
      if(user) {
        const response = await axios.get('http://localhost:5000/api/tasks')
        setTasks(response.data)
        }
    } catch(error) {
      console.log(error)
      setTasks([])
    }
  }

  const addTask = async (task) => {
    try {
      if(user) {
        const response = await axios.post('http://localhost:5000/api/tasks', task)
        fetchTasks()
        }
    } catch(error) {
      console.log(error)
    }
  }

  const editTask = async (task) => {
    try {
      if(user) {
        
        const response = await axios.post(`http://localhost:5000/api/tasks/${task._id}`, task)
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
    <TasksContext.Provider value={{tasks, fetchTasks, addTask, editTask, deleteTask}}>
        {children}
    </TasksContext.Provider>
    
  )
}

export default TasksContext