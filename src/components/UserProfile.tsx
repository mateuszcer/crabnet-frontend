import React from 'react'
import "../styles/UserProfile.css"
import UserInfo from "../types/UserInfo"
import { useState } from 'react';
import UserServices from '../services/user.services';
import { useEffect } from 'react';

import profilePicture from '../assets/user.png'
import { useParams } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Navbar from './Navbar';
import userServices from '../services/user.services';
import AuthService from '../services/auth.services'
import { useFollow } from '../hooks/useFollow';
export default function UserProfile() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [isMe, setIsMe] = useState<boolean>(false);
    const {username} = useParams();
    const {logout} = useLogout()

    const {handleFollow, handleUnfollow, error, followed} = useFollow(username || "")


    useEffect(() => {
        const getUserInfo = async () => {
          const res = await UserServices.getUserInfo(username || "")
          
          if(res.status == 401) {
            logout()
            return
          }
          if(res.data.username === AuthService.getUsername()){
            setIsMe(true)
          }
          console.log(AuthService.getUsername(), res.data.username, res.data.username == AuthService.getUsername())
          setUserInfo(res.data)
        } 
        getUserInfo();
      }, [])


  return (
    <React.StrictMode>
      
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
    <Navbar/>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-12 col-xl-4">

        <div className="card" style={{borderRadius: "15px"}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src={profilePicture}
                className="rounded-circle img-fluid" style={{width: "100px"}} />
            </div>
            <h4 className="mb-2">{userInfo?.firstname} {userInfo?.lastname}</h4>
            <p className="text-muted mb-4">@{userInfo?.username}</p>

            {
              isMe ?
              <button  type="button" className="btn btn-primary btn-rounded btn-lg">
              Edit bio
            </button>
             :
             (
              followed ?
              <button onClick={handleUnfollow} type="button" className="btn btn-primary btn-rounded btn-lg btn-danger">
              Unfollow
            </button>
              :
              <button onClick={handleFollow} type="button" className="btn btn-primary btn-rounded btn-lg ">
              Follow
            </button>)
            }
            {error && <div className="alert alert-danger mt-2" role="alert">
            {error}
              </div>}
            <div className="d-flex justify-content-center text-center mt-5 mb-2">
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.posts.length}</p>
                <p className="text-muted mb-0">Posts created</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.following.length}</p>
                <p className="text-muted mb-0">Following</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.followers.length}</p>
                <p className="text-muted mb-0">Followers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </React.StrictMode>
  )
}
