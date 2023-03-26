import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import reactLogo from './assets/react.svg'
//import './App.css'
import AuthService from './services/auth.services'
import LoginPage from './components/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import RequireAuth from './components/RequireAuth'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import RegisterPage from './components/RegisterPage'

function App() {
  const handleLogin = () => {
    console.log(AuthService.login("admin", "admin"))
    return true;
  }
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile/:username" element={
        <RequireAuth>
          <UserProfile />
        </RequireAuth>
        }/>
        
      </Routes>
      
    </div>
  )
}

export default App
