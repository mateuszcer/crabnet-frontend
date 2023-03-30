import React, { useEffect, useState } from 'react'
import userServices from '../services/user.services';
import User from '../types/UserInfo';

export default function UserCard() {
    const [userInfo, setUserInfo] = useState<User>();

    useEffect(() => {
        const getUserInfo = async () => {
          const { data: selfInfo } = await userServices.getSelfInfo()
          setUserInfo(selfInfo)
        } 
        getUserInfo();
      }, [])

  return (
    <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="h5">@{userInfo?.username}</div>
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
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
  )
}
