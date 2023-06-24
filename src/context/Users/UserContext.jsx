import{createContext, useState } from 'react'

const TasksContext = createContext()

export const TasksProvider = ({children}) => {
  const [user, setUser] = useState([])
  const [Users, setUsers] = useState([])
  const [loading, setLoading] = useState([])

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/Users')
    setUsers(await response.json())
  }

  const addTask = async (task) => {
    const reqInfo = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch('http://localhost:3000/Users', reqInfo)
    fetchUsers()
  }

  const editTask = async (task) => {
    const reqInfo = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch(`http://localhost:3000/Users/${task.id}`, reqInfo)
    fetchUsers()
  }

  const deleteTask = async (task) => {
    const reqInfo = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }
    const response = await fetch(`http://localhost:3000/Users/${task.id}`, reqInfo)
    fetchUsers()
  }


  return (
    <UsersContext.Provider value={{Users, fetchUsers, addTask, editTask, deleteTask}}>
        {children}
    </UsersContext.Provider>
    
  )
}

export default UsersContext