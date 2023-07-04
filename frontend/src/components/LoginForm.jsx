import { useState, useContext } from "react"
import UserContext from "../context/Users/UserContext"
import { useNavigate } from "react-router-dom"


function LoginForm() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
        errors: {}
    })

    const {loginUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: formData.email,
            password: formData.password
        }

        const response = await loginUser(user)
        response === true ? navigate('/profile') : setFormData({...formData, errors: response}) 
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
                {/* Email */}
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} className={`formInput ${formData.errors.email && 'isInvalid'}`}></input>
                {formData.errors.email && <div className="invalidText">{formData.errors.email}</div>}
                {/* Password */}
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} className={`formInput ${formData.errors.password && 'isInvalid'}`}></input>
                {formData.errors.password && <div className="invalidText">{formData.errors.password}</div>}

                <div className="flexBetween">
                    <button className='btn login-btn' type='submit'>Login</button>
                    <button className="btn" onClick={()=> navigate('/register')}>Register Instead!</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm