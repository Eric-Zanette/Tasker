import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    let localToken = localStorage.getItem('user')

    const [user, setUser] = useState(localToken &&
        jwt_decode(
        localStorage.getItem('user')
        ))
   
    const isExpired = (token) => {
        try{
            const decodedToken = jwt_decode(token)
            const now = Math.floor(Date.now() / 1000)
            if(now > decodedToken.exp) {localStorage.removeItem('user')}
            
        } catch {
            return false
        }
    }

    useEffect(() => {
        isExpired(localToken)
        axios.defaults.headers.common['Authorization'] = localToken
    }, [localToken])

    
    const registerUser = async (newUser) => {
        try {
            await axios.post('http://localhost:5000/api/users/register', newUser)
            return true
        } catch(error) {

            return error.response.data
        }
      }
    
    const loginUser = async(user) => {
        try{
            const response = await axios.post('http://localhost:5000/api/users/login', user)
            const token = response.data.token
            console.log(token)

            setUser(jwt_decode(token))
            localStorage.setItem('user', token)
            axios.defaults.headers.common['Authorization'] = token

            return true
        } catch(error){
            console.log(error.response.data)
            return error.response.data
        }
    }

    const logout = async () => {
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