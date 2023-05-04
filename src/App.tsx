import "bootstrap/dist/css/bootstrap.min.css"
import LoginPage from './components/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import RegisterPage from './components/RegisterPage'
import ConfirmSignup from './components/ConfirmSignup'
import Search from './components/Search'
import "./styles/Global.css"
import PostPage from './components/PostPage'
import ErrorPage from './components/ErrorPage'

import ChatRoom from './components/ChatRoom'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/chat" element={
        <RequireAuth>
          <ChatRoom />
        </RequireAuth>
        
        }/>
        
        <Route path="/signup/confirm" element={<ConfirmSignup/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard/>
        </RequireAuth>
        
        }/>
        <Route path="/" element={
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
        <Route path="/chat/:username" element={
        <RequireAuth>
          <ChatRoom />
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
