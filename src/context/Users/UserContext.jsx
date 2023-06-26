import { createContext, useState, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const registerUser = async (formData) => {
        console.log(formData)
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        response.ok && await setUser(data.user)
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
        return response
    }

    const logout = async (formData) => {
        setUser(null)
    }   


    return(
        <UserContext.Provider value={{user, registerUser, logout, loginUser}}>
            {children}
        </UserContext.Provider>
        )
}

export default UserContext