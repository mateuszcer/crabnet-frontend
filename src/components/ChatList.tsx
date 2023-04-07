import React from 'react'
import MinimalUserInfo from '../types/MinimalUserInfo'
import "../styles/ChatList.css"
import ContactRow from './ContactRow'
export default function ChatList({followers}: {followers: Array<MinimalUserInfo>}) {
    console.log(followers)
    return (
        <div className="">
            <div className="followers-header">
                <p>Chat</p>
               
                
            </div>
        <div className="chat-contacts">
            {followers.map((following, index) => <ContactRow  key={index} {...following}/>)}
        </div>
        </div>
      )
}


