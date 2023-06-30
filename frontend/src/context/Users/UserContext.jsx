import { createContext, useState, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const registerUser = async (formData) => {
        console.log(formData)
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        response.ok && await setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        return response
      }

    const loginUser = async(formData) => {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        
        const data = await response.json()
        response.ok && await setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        return response
    }

    const logout = async (formData) => {
        setUser(null)
        localStorage.removeItem('user')
    }   


    return(
        <UserContext.Provider value={{user, registerUser, logout, loginUser}}>
            {children}
        </UserContext.Provider>
        )
}

export default UserContext