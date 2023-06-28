import { useState, useContext } from "react"
import UserContext from "../context/Users/UserContext"
import { useNavigate } from "react-router-dom"


function LoginForm() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '' // required
    })

    const {loginUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await loginUser(formData)
        response.ok ? navigate('/profile') : alert('Wrong email/password')
    }

    function handleChange(e) {
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        }
            )
    }

    return (
        <>
            <h1>Login Form</h1>
            <form className='form login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} className="formInput"></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} className="formInput"></input>
                <div className="flexBetween">
                    <button className='btn login-btn' type='submit'>Login</button>
                    <button className="btn" onClick={()=> navigate('/register')}>Register Instead!</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm