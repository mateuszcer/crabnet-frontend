import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import reactLogo from './assets/react.svg'
//import './App.css'
import AuthService from './services/auth.services'
import LoginPage from './components/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import RequireAuth from './components/RequireAuth'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import RegisterPage from './components/RegisterPage'
import ConfirmSignup from './components/ConfirmSignup'
import UserSearchCard from './components/UserSearchCard'
import Search from './components/Search'
import "./styles/Global.css"
import PostPage from './components/PostPage'
import ErrorPage from './components/ErrorPage'
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup/confirm" element={<ConfirmSignup/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={
        <RequireAuth>
        <Dashboard/>
        </RequireAuth>
        
        }/>
        <Route path="/post/:id" element= {
          <RequireAuth>
            <PostPage />
          </RequireAuth>
        }/>
         <Route path="/search/:pattern" element={
        <RequireAuth>
          <Search/>
        </RequireAuth>
        
        }/>
        <Route path="/profile/:username" element={
        <RequireAuth>
          <UserProfile />
        </RequireAuth>
        }/>
        <Route
      path="*"
      element={<ErrorPage/>}
        />
        
      </Routes>
      
    </div>
  )
}

export default App
