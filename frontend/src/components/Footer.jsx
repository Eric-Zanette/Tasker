import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/Users/UserContext'




const Footer = () => {
  const{user} = useContext(UserContext)
  const navigate = useNavigate()


  return (
    <footer>
      <div className="container flex">
        <div>
            <p>Tasker &copy; A Taskings incorporate incorporated corporation</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer