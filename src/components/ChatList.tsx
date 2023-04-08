import React from 'react'
import MinimalUserInfo from '../types/MinimalUserInfo'
import "../styles/ChatList.css"
import ContactRow from './ContactRow'
export default function ChatList({followers}: {followers: Array<MinimalUserInfo>}) {
    
    return (
    <>
        {followers.length > 0 ?
        
        <div className="">
            <div className="followers-header">
                <p>Chat</p>
               
                
            </div>
        <div className="chat-contacts">
            {followers.map((following, index) => <ContactRow  key={index} {...following}/>)}
        </div>
        </div>
        :
        <></>
        }
    </>
      )
}


