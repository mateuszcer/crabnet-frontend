import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import pictureServices from '../services/picture.services'
import MinimalUserInfo from '../types/MinimalUserInfo'

export default function ContactRow(user: MinimalUserInfo) {
    const navigate = useNavigate()
  return (
    <div className="card-body text-center follower-row" onClick={(e: any) => navigate(`/chat/${user.username}`,)}>
        <img src={pictureServices.getPicture(user.pictureId || 1)}  alt="User" className=""/>
        <h5 className="card-title">{user.firstname} {user.lastname}</h5>
        <FontAwesomeIcon className="message-icon" icon={faMessage}/>
      </div>
  )
}
