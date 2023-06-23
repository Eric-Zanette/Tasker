import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Navbar = () => {


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
            <li className='navItem' onClick={() => navigate('/profile')}>Profile</li>
            <li className='navItem' onClick={() => navigate('/about')}>About</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar