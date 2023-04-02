import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import userServices from '../services/user.services';
import User from '../types/UserInfo'
import Navbar from './Navbar';
import UserSearchCard from './UserSearchCard'
import "../styles/UserSearchCard.css"
import { useAuthContext } from '../hooks/useAuthContext';
export default function Search() {

    const [users, setUsers] = useState<Array<User>>([])
    const {pattern} = useParams();
    const {logout} = useLogout()
    const navigate = useNavigate()
    const {state} = useAuthContext()

    useEffect(() => {
        const getUsers = async () => {
          const res = await userServices.getAllUsersByPattern(pattern || "");
          
          if(res.status == 401) {
            logout()
            return
          }

          setUsers(res.data)
        } 
        getUsers();
      }, [])

      

  return (
    <React.StrictMode>
        <Navbar/>
        <div className="container search-container">
          <div className="main-body">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm gedf-wrapper">
        
            {users.map((user: User) => user.username != state.username ? <UserSearchCard key={user.username} {...user} /> : <></>)}
        </div>
    </div>
    </div>
    </React.StrictMode>
  )
}
