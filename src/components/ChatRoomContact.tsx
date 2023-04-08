import React from 'react'
import { useNavigate } from 'react-router-dom'
import pictureServices from '../services/picture.services'
import MinimalUserInfo from '../types/MinimalUserInfo'
import "../styles/ChatRoom.css"
export default function ChatRoomContact(user: MinimalUserInfo) {
    const navigate = useNavigate()
  return (
    <li className="border-bottom" onClick={(e:any) => navigate(`/chat/${user.username}`)}>
                        
                          <div className="chat-room-contact">
                            <div className="chat-contact-header">
                              <img src={pictureServices.getPicture(user.pictureId || 1)} style={{width:"36px"}} alt="User" className=""/>
                              <p className="fw-bold mb-0">{user.firstname} {user.lastname}</p>
                              
                            </div>
                            {/* <div className="pt-1">
                              <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div> */}
                          </div> 
                          {/* TODO: Last message */}
                          {/* <div className="pt-1">
                            <p className="small text-muted mb-1">5 mins ago</p>
                            <span className="badge bg-danger rounded-pill float-end">2</span>
                          </div> */}
                        
                      </li>
  )
}
