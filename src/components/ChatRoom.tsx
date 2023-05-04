import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userServices from '../services/user.services'
import "../styles/ChatRoom.css"
import MinimalUserInfo from '../types/MinimalUserInfo'
import MinimalUserInfoDefault from '../types/MinimalUserInfoDefault'
import Chat from './Chat'
import ChatRoomContact from './ChatRoomContact'
import Navbar from './Navbar'
import EmptyChatPage from './EmptyChatPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading'
export default function ChatRoom() {
    const {username} = useParams()
    const [currentUser, setCurrentUser] = useState<MinimalUserInfo>(MinimalUserInfoDefault)
    const [showChat, setShowChat] = useState<boolean>(false)
    const [showContacts, setShowContacts] = useState<boolean>(false)
    
    
    useEffect(() => {
      const following = userServices.getFollowing()
      setShowContacts(false)
        if(username != undefined){
          
          const user = following.find((user: MinimalUserInfo) => user.username == username)
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
                  <div data-mdb-perfect-scrollbar="true" className={showContacts ? "chat-room-contacts contacts-visible" : "chat-room-contacts hidden-room-contacts"}>
                    
                    <div className="contact-header">
                        <h5>{showContacts && "Chats"}</h5>
                        <FontAwesomeIcon className="chat-list-control" icon={faAngleLeft} onClick={(e: any) => setShowContacts(!showContacts)}/>
                    </div>
                    
                    <ul className={showContacts ? "list-unstyled mb-0 contacts" : "list-unstyled mb-0 contacts hide-contancts"}>
                        {userServices.getFollowing().map((user: MinimalUserInfo, index: number) => <ChatRoomContact key={index} {...user}/>)}
                               
                    </ul>
                    
                    
                    
                    
                    
                  </div>
                  
                    {
                      userServices.getFollowing().length == 0 ? <></> : <></>
                    }
                  

                  <div className="messager-container" data-mdb-perfect-scrollbar="true">

                <Chat {...currentUser}/>      
                </div>
            </div>
      </div>
      :
      <>
      
      {!userServices.getFollowing().length ? 
      <EmptyChatPage/>
    :
    <Loading/>
    }
      
      </>

    } 
      

    </>
  )
}
