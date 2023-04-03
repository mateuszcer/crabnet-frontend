import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pictureServices from '../services/picture.services'
import userServices from '../services/user.services'
import MinimalUserInfo from '../types/MinimalUserInfo'
import UserInfo from '../types/UserInfo'
import "../styles/FollowersList.css"
export default function FollowerRow({username, pictureId} : MinimalUserInfo) {
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserInfo = async () => {
      
    }
    
  }, [])
  return (
    
      <div className="card-body text-center follower-row" onClick={(e: any) => navigate(`/profile/${username}`)}>
        <img src={pictureServices.getPicture(pictureId || 1)} style={{width:"50px"}} alt="User" className=""/>
        <h5 className="card-title">@{username}</h5>
      </div>
    
        
      
    
  )
}
