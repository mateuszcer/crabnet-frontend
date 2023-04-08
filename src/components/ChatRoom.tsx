import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userServices from '../services/user.services'
import "../styles/ChatRoom.css"
import MinimalUserInfo from '../types/MinimalUserInfo'
import MinimalUserInfoDefault from '../types/MinimalUserInfoDefault'
import Chat from './Chat'
import ChatRoomContact from './ChatRoomContact'
import Navbar from './Navbar'
import ErrorPage from './ErrorPage'
import EmptyChatPage from './EmptyChatPage'
export default function ChatRoom() {
    const {username} = useParams()
    const [currentUser, setCurrentUser] = useState<MinimalUserInfo>(MinimalUserInfoDefault)
    const [showChat, setShowChat] = useState<boolean>(false)
    useEffect(() => {
      const following = userServices.getFollowing()
      
        if(username != undefined){
          
          const user = following.find((user: MinimalUserInfo) => Object.values(user).includes(username))
          setCurrentUser(user)
          setShowChat(true)
        }
        else if(following.length > 0){
          
          setCurrentUser(following[0])
          setShowChat(true)
        }

    
    }, [username])

  return (
    <>
      <Navbar/>

      { showChat ? 

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
      :
      <EmptyChatPage/>
    } 
      

    </>
  )
}
