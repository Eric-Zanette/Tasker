import { useState, useContext } from "react"
import UserContext from '../context/Users/UserContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
        username: '', //require
        password2: '', // required
        errors: {}
    })

    const { registerUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser= {
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            username: formData.username
        }

        const reponse = await registerUser(newUser)
        reponse ===true ? navigate('/login') : setFormData({...formData, errors:reponse})
        console.log(formData)
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <>
            <h1>Signup Form</h1>
            <form className='form login-form' onSubmit={e => handleSubmit(e)}>
                {/* username */}
                <input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} className={`formInput ${formData.errors.username && 'isInvalid'}`}></input>
                {formData.errors.username && <div className="invalidText">{formData.errors.username}</div>}
                {/* email */}
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} className={`formInput ${formData.errors.email && 'isInvalid'}`}></input>
                {formData.errors.email && <div className="invalidText">{formData.errors.email}</div>}
                {/* password */}
                <input type='password' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} className={`formInput ${formData.errors.password && 'isInvalid'}`}></input>
                {formData.errors.password && <div className="invalidText">{formData.errors.password}</div>}
                {/* password2 */}
                <input type='password' placeholder='Repeat Password' value={formData.password2} name='password2' onChange={e => handleChange(e)} className={`formInput ${formData.errors.password2 && 'isInvalid'}`}></input>
                {formData.errors.password2 && <div className="invalidText">{formData.errors.password2}</div>}

                <div className="flexBetween">
                    <button className='btn login-btn' type='submit' onClick={handleSubmit}>Sign Up</button>
                    <button className="btn" type="button" onClick={()=> navigate('/login')}>Login Instead!</button>
                </div>
            </form>
        </>
    )
}

export default SignUpForm