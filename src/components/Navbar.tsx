import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import profilePicture from '../assets/user.png'
import authServices from '../services/auth.services'
import userServices from '../services/user.services'
import pictureServices from '../services/picture.services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faComments, faSearch  } from '@fortawesome/free-solid-svg-icons'
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
        
        
    }

    

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white nav-wrapper" >
        <div className="navbar-container">
          <div className="brand-container" >  
            <p className="h3 mr-4 mb-0 crabnet-logo" onClick={(e: any) => navigate("/dashboard")}><b className="text-danger">Crab</b><b>Net</b></p>
            <form className="" onSubmit={handleSubmit}>
                <div className="input-group search-group">
                    <FontAwesomeIcon className={pattern ? "search-icon icon-hidden" : "search-icon"} icon={faSearch} />
                    <input placeholder="      Search for users"  onInput={handleInput} type="search" className="form-control" aria-label="Search" />
                </div>
            </form>
          </div>
        
          <div className="navbar-controls">
            <FontAwesomeIcon icon={faComments} className="chat-room-icon" onClick={(e: any) => navigate("/chat/")}/>

            <div>
            
                      <Dropdown>
                          <Dropdown.Toggle style={{border: "none", backgroundColor: "white", borderRadius: "100px"}} variant="secondary" >
                          <FontAwesomeIcon className="settings" size="lg" color="#332D2D" icon={faCog}/>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={e => logout()}>Logout</Dropdown.Item>
                            <Dropdown.Item onClick={e => navigate(profileUrl)}>Profile</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
              </div>
              <div className="nav-profile-picture">
                <img onClick={(e: any) => navigate(profileUrl)} 
                  src={pictureServices.getSelfPicture()}
                  className="rounded-circle profile-picture" style={{width: "42px"}} />
            </div>
          </div>
        </div>
    </nav>
  )
}
