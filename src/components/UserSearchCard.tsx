import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFollow } from '../hooks/useFollow'
import authServices from '../services/auth.services'
import pictureServices from '../services/picture.services'
import userServices from '../services/user.services'
import "../styles/UserSearchCard.css"
import User from '../types/UserInfo'
import Navbar from './Navbar'
export default function UserSearchCard({username, firstname, lastname, posts, followers, following, bio, pictureId}: User) {

    const {followed, error, handleFollow, handleUnfollow} = useFollow(username)
    const navigate = useNavigate()
  return (

    
      
        <div className="col mb-3">
          <div className="card">
            <div className="card-body text-center search-card-body" onClick={(e: any) => navigate(`/profile/${username}`)}>
              <img src={pictureServices.getPicture(pictureId || 1)} style={{width:"100px"}} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3"/>
              <h5 className="card-title">{firstname} {lastname}</h5>
              <p className="text-secondary mb-1">@{username}</p>
            </div>
            <div className="card-footer">
              {followed ? 
              <button className="btn btn-sm btn-block btn btn-rounded btn-lg btn-danger" type="button" onClick={handleUnfollow}>Unfollow</button>
              :
              <button className="btn btn-sm btn-block btn btn-rounded btn-lg btn-primary" type="button" onClick={(e: any) => handleFollow(pictureId)}>Follow</button>
              }
              {error && <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>}  

            
              
            </div>
          </div>
        </div>
        
        
      
  
  )
}
