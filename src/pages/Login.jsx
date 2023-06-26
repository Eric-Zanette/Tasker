import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
      <div className="formContainer">
          <LoginForm />
       </div>
    )
}

export default Login