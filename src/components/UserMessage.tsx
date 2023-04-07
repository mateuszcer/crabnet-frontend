import React, { useEffect, useState } from 'react'
import authServices from '../services/auth.services'
import pictureServices from '../services/picture.services'
import ChatMessage from '../types/ChatMessage'
import "../styles/Chat.css"
import timeUtils from '../utils/time.utils'

export default function UserMessage(message: ChatMessage) {

  const [isMe, setIsMe] = useState<boolean>(false)

  useEffect(() => {
    setIsMe(authServices.getUsername() == message.sender.username)
  })
  return (
    
        
                  <div className={isMe ? "my-message message" : "received-message message"}>
                    <div className="chat-picture">

                    {!isMe && <img src={pictureServices.getPicture(message.sender.pictureId)}
                      alt="avatar 1" />}
                      </div>
                    <div className="mb-5">
                      <p className="message-content small " >
                        {message.message}
                      </p>
                      {/* <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{timeUtils.formatPublishedTime(message.creationTime)}</p> */}
                    </div>
                    <div className="chat-picture">

                    {isMe && <img src={pictureServices.getPicture(message.sender.pictureId)}
                      alt="avatar 1"/>}
                      </div>
                  </div>
                
    
  )
}
