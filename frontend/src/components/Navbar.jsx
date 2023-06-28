import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/Users/UserContext'




const Navbar = () => {
  const{user} = useContext(UserContext)
  const navigate = useNavigate()


  return (
    <nav>
      <div className="container flex">
        <div className="logo">
          <h1 className='navLogo'>Tasker</h1>
        </div>
        <div className="navListContainer">
          <ul className="navList">
            <li className='navItem' onClick={() => navigate('/')} >Tasks</li>
            <li className='navItem' onClick={() => navigate(`/${user ? 'profile' : 'login'}`)}>Profile</li>
            <li className='navItem' onClick={() => navigate('/about')}>About</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar