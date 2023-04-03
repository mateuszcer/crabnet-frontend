import React from 'react'
import MinimalUserInfo from '../types/MinimalUserInfo'
import FollowerRow from './FollowersRow'
import "../styles/FollowersList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
export default function FollowersList({followers, name, show}: {followers: Array<MinimalUserInfo>, name: string, show: any}) {
  return (
    <div className="follower-list">
        <div className="followers-header">
            <p>{name}</p>
            <FontAwesomeIcon onClick={(e) => show(false)} className="close-icon" icon={faTimes} />
        </div>
    <div className="followers-container">
        {followers.map(following => <FollowerRow {...following}/>)}
    </div>
    </div>
  )
}
