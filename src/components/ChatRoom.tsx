import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userServices from '../services/user.services'
import "../styles/ChatRoom.css"
import MinimalUserInfo from '../types/MinimalUserInfo'
import MinimalUserInfoDefault from '../types/MinimalUserInfoDefault'
import Chat from './Chat'
import ChatRoomContact from './ChatRoomContact'
import Loading from './Loading'
import Navbar from './Navbar'
import Message from './UserMessage'
export default function ChatRoom() {
    const {username} = useParams()
    const [currentUsername, setCurrentUsername] = useState<string>("")
    const [currentUser, setCurrentUser] = useState<MinimalUserInfo>(MinimalUserInfoDefault)
    
    useEffect(() => {
        setCurrentUsername(username || "")
        const user = userServices.getFollowing().find((user: MinimalUserInfo) => Object.values(user).includes(username))
        setCurrentUser(user)
    
    }, [username])

  return (
    <>
      <Navbar/>

       
        <div className="row chat-wrapper">
     
              <div className="chat-container">
                  <div data-mdb-perfect-scrollbar="true" className="chat-room-contacts">
                    <div className="contact-header">
                        <h5>Following</h5>
                    </div>
                    <ul className="list-unstyled mb-0 ">
                        {userServices.getFollowing().map((user: MinimalUserInfo, index: number) => <ChatRoomContact key={index} {...user}/>)}
                               
                    </ul>
                  </div>

                <Chat {...currentUser}/>
            </div>
      </div>
    
        

      

      

    </>
  )
}
