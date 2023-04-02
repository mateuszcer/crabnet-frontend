import React from 'react'
import pictureServices from '../services/picture.services'
import CommentInfo from '../types/CommentInfo'
import "../styles/Comment.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import timeUtils from '../utils/time.utils'

export default function Comment(commentInfo: CommentInfo) {
  return (
    
        
          <div className="card-body comment">
              <div className="comment-header">
                <img src={pictureServices.getPicture(commentInfo.authorPictureId)} alt="avatar" width="30"
                  />
                <a href={`/profile/${commentInfo.authorUsername}`} className="comment-username">@{commentInfo.authorUsername}</a>
              </div>
            <div className="comment-body">

                <div className="comment-content">
                    <p>{commentInfo.content}</p>
                </div>
                <div className="d-flex justify-content-between comment-footer">
                  <div>
                    <p className="comment-date text-muted small">{timeUtils.formatPublishedTime(commentInfo.creationTime)}</p>
                  </div>
                  
                  <div className="comment-like-control">
                    <p className="small text-muted mb-0">Like</p>
                    <FontAwesomeIcon  className="comment-like-icon" size="xs" icon={faThumbsUp}/>
                    <p className="small text-muted mb-0">3</p>
                  </div>


                </div>
            </div>
          </div>
        
        

    
  

  )
}
