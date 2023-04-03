import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import userServices from '../services/user.services';
import User from '../types/UserInfo';

export default function UserCard() {
    const [userInfo, setUserInfo] = useState<User>();
    const {logout} = useLogout()
    const navigate = useNavigate()

    useEffect(() => {
        const getUserInfo = async () => {
          const res = await userServices.getSelfInfo()
          if(res.status == 200){
            setUserInfo(res.data)
          }
          else if(res.status == 401) {
            logout()
        }
          
        } 
        getUserInfo();
      }, [])

  return (
    <div className="col-md-3 mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="h5" style={{color: "#0275d8", cursor:'pointer'}} onClick={(e:any) => {navigate(`/profile/${userInfo?.username}`)}}>@{userInfo?.username}</div>
                        <div className="h7 text-muted">Fullname : {userInfo?.firstname} {userInfo?.lastname}</div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="h6 text-muted">Followers</div>
                            <div className="h5">{userInfo?.followers.length}</div>
                        </li>
                        <li className="list-group-item">
                            <div className="h6 text-muted">Following</div>
                            <div className="h5">{userInfo?.following.length}</div>
                        </li>
                        <li className="list-group-item">{userInfo?.bio}</li>
                    </ul>
                </div>
            </div>
  )
}
