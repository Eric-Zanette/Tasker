import { useState, useContext } from "react"
import UserContext from '../context/Users/UserContext'
import { useNavigate } from "react-router-dom"

function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
        username: '' // optional
    })

    const { registerUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = registerUser(formData)
        response.ok && navigate('/profile')
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <>
            <h1>Signup Form</h1>
            <form className='form login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} className="formInput"></input>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} className="formInput"></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} className="formInput"></input>
                <div className="flexBetween">
                    <button className='btn login-btn' type='submit' onClick={handleSubmit}>Sign Up</button>
                    <button className="btn" type="button" onClick={()=> navigate('/login')}>Login Instead!</button>
                </div>
            </form>
        </>
    )
}

export default SignUpForm