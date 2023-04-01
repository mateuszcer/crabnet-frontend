import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import profilePicture from '../assets/user.png'
import authServices from '../services/auth.services'
import userServices from '../services/user.services'
import pictureServices from '../services/picture.services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog  } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/Navbar.css"

export default function Navbar() {
    const profileUrl = "/profile/" + authServices.getUsername()
    const [pattern, setPattern] = useState("")
    const {logout} = useLogout()
    const navigate = useNavigate()

    const handleInput = (e: any) => {
        setPattern(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/search/" + pattern)
        navigate(0)
        
    }

    

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="navbar-container">
          <div className="brand-container">  
            <a href="/dashboard" className="navbar-brand font-weight-normal"><p className="h3"><b className="text-danger">Crab</b><b>Net</b></p></a>
          </div>
        
          <div className="navbar-controls">

            <form className="form-inline mr-4" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input placeholder="Search for users"  onInput={handleInput} type="search" className="form-control mr-3" aria-label="Search" />

                </div>
            </form>

            <div className="mr-3">
                <a href={profileUrl} ><img src={pictureServices.getSelfPicture()}
                  className="rounded-circle img-fluid profile-picture" style={{width: "45px"}} /></a>
            </div>

            <div>
            
                        <Dropdown>
              <Dropdown.Toggle style={{border: "none", backgroundColor: "white", borderRadius: "100px"}} variant="secondary" >
              <FontAwesomeIcon className="settings" size="lg" color="#332D2D" icon={faCog}/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={e => logout()}>Logout</Dropdown.Item>

              </Dropdown.Menu>
                </Dropdown>
              </div>
          </div>
        </div>
    </nav>
  )
}
