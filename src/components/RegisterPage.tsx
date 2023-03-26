import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./Login.css"
import userServices from '../services/user.services'
import authServices from '../services/auth.services'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const navigate = useNavigate();
    const [gender, setGender] = useState<string>("")
    const onRadioChange = (event: any) => {
        setGender(event.target.value)
    }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target[0].value
    const username = event.target[1].value
    const firstname = event.target[2].value
    const lastname = event.target[3].value
    const password = event.target[4].value
    console.log(lastname)
    authServices.registerUser(email, username, firstname, lastname, password, gender);    
}

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-1">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="row">

          <div className="form-group col-md mb-3">
            <label>Firstname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter firstname"
              />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label>Lastname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter lastname"
              />
          </div>
              </div>
          <div className="form-group mt-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
            <div className="form-check form-check-inline">
                <input type="radio" className="form-check-input" onChange={onRadioChange} name="optradio" value="Male"/>Male
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" onChange={onRadioChange} name="optradio" value="Female"/> Female
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" onChange={onRadioChange} name="optradio" value="Other"/>Other
            </div> 
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Already <a href="/login">registered</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
