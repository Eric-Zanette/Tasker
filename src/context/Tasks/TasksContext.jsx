import{createContext, useState } from 'react'

const TasksContext = createContext()

export const TasksProvider = ({children}) => {
  const [user, setUser] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState([])

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks')
    setTasks(await response.json())
  }

  const addTask = async (task) => {
    const reqInfo = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch('http://localhost:3000/tasks', reqInfo)
    fetchTasks()
  }

  const editTask = async (task) => {
    const reqInfo = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, reqInfo)
    fetchTasks()
  }

  const deleteTask = async (task) => {
    const reqInfo = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, reqInfo)
    fetchTasks()
  }


  return (
    <TasksContext.Provider value={{tasks, fetchTasks, addTask, editTask, deleteTask}}>
        {children}
    </TasksContext.Provider>
    
  )
}

export default TasksContext