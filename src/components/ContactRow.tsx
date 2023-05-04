import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import pictureServices from '../services/picture.services'
import MinimalUserInfo from '../types/MinimalUserInfo'

export default function ContactRow(user: MinimalUserInfo) {
    const navigate = useNavigate()
  return (
    <div className="contact-row" onClick={(e: any) => navigate(`/chat/${user.username}`,)}>
        <div className="contact-info">
          <img src={pictureServices.getPicture(user.pictureId || 1)}  alt="User" className=""/>
          <h5 className="">{user.firstname} {user.lastname}</h5>
        </div>
        <FontAwesomeIcon className="message-icon" icon={faMessage}/>
      </div>
  )
}
