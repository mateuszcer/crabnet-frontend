import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import userServices from '../services/user.services';
import User from '../types/UserInfo'
import Navbar from './Navbar';
import UserSearchCard from './UserSearchCard'
import "../styles/UserSearchCard.css"
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from './Loading';
export default function Search() {

    const [users, setUsers] = useState<Array<User>>([])
    const {pattern} = useParams();
    const {logout} = useLogout()
    const navigate = useNavigate()
    const {state} = useAuthContext()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    useEffect(() => {
        const getUsers = async () => {
          const res = await userServices.getAllUsersByPattern(pattern || "");
          if(!res) {
            setError("Something went wrong, please try again")
            setIsLoading(false)
          }
          if(res.status == 401) {
            logout()
            return
          }
          if(res.status == 200){
            setError("")
            setUsers(res.data)
            setIsLoading(false)
          }
        } 
        getUsers();
      }, [pattern])

      

  return (
    <React.StrictMode>
      <Navbar/>
      {
        isLoading ?
        <Loading/>
        :
        

        <div className="container search-container">
          {
            error ?
            <div className="alert alert-danger mt-2" role="alert">
              {error}
              </div>
              :
            <div className="main-body">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm gedf-wrapper">
        
            {users.map((user: User) => user.username != state.username ? <UserSearchCard key={user.username} {...user} /> : <></>)}
            </div>
          </div>
          }
        </div>
        }
    </React.StrictMode>
  )
}
