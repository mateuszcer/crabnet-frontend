import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./Login.css"
import AuthService from "../services/auth.services"
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup';
import { render } from 'react-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value
    const response = await AuthService.login(email, password);
    if(response.status == "200") {
      setShowMessage(false)
      navigate("/profile/" + response.data.username)
    }
    else {
      setShowMessage(true)
    } 
  }

  const renderErrorMessage = () =>
  
  showMessage && (
    <div className="alert alert-danger" role="alert">
  Enter valid credentials
  </div>
  );

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          {renderErrorMessage()}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Create <a href="/register">account</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
