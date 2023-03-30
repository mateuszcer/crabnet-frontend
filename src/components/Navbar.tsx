import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import userServices from '../services/user.services'

export default function Navbar() {

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
    <nav className="navbar navbar-light bg-white">
        <a href="/dashboard" className="navbar-brand">Crabnet</a>
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group">
                <input placeholder="Search for users"  onInput={handleInput}type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                
            </div>
        </form>
    </nav>
  )
}
