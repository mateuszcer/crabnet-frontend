import React, { useEffect, useState } from 'react'
import pictureServices from '../services/picture.services'
import CommentInfo from '../types/CommentInfo'
import "../styles/Comment.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp , faTrash} from '@fortawesome/free-solid-svg-icons'
import timeUtils from '../utils/time.utils'
import userPostServices from '../services/userPost.services'
import authServices from '../services/auth.services'
import { useNavigate } from 'react-router-dom'

export default function Comment(commentInfo: CommentInfo) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isMine, setIsMine] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLikes(commentInfo.likedBy.length)
    setIsLiked(commentInfo.likedBy.includes(authServices.getUsername()))
    setIsMine(commentInfo.authorUsername === authServices.getUsername())
  }, [])

  const handleLike = async (e: any) => {
    const res = await userPostServices.likeComment(commentInfo.id)
    if(res.status == 200) {
      setLikes(likes+1)
      setIsLiked(true)
    }
  }

  const handleDislike = async (e: any) => {
    const res = await userPostServices.dislikeComment(commentInfo.id)
    if(res.status == 200) {
      setLikes(likes-1)
      setIsLiked(false)
    }
  }

  const handleDelete = async (e: any) => {
    const res = await userPostServices.deleteComment(commentInfo.id)
    if(res.status == 200) {
      setIsVisible(false)
    }
  }


  return (
      <React.StrictMode>

        {
          isVisible ?
        
          <div className="card-body comment">
              <div className="comment-top">

                <div className="comment-header">
                  <img src={pictureServices.getPicture(commentInfo.authorPictureId)} alt="avatar" width="30"
                    />
                  <a href="#" onClick={(e) => navigate(`/profile/${commentInfo.authorUsername}`)} className="comment-username">@{commentInfo.authorUsername}</a>
                </div>

                {isMine ?
                <div onClick={handleDelete}> 
                <FontAwesomeIcon size="2xs" className="delete-icon" icon={faTrash} />
                </div>
                :
                <></>
              }
              </div>
            <div className="comment-body">

                <div className="comment-content">
                    <p>{commentInfo.content}</p>
                </div>
                <div className="d-flex justify-content-between comment-footer">
                  <div>
                    <p className="comment-date text-muted small">{timeUtils.formatPublishedTime(commentInfo.creationTime)}</p>
                  </div>
                  
                  <div className="comment-like-control" onClick={isLiked ? handleDislike: handleLike}>
                    <p className="small text-muted mb-0">Like</p>
                    <FontAwesomeIcon  className="comment-like-icon" color={isLiked ? "rgb(2, 117, 217)" : "" } size="xs" icon={faThumbsUp}/>
                    <p className="small text-muted mb-0">{likes}</p>
                  </div>


                </div>
            </div>
          </div>
          :
          <></>
            }
        
          </React.StrictMode>

    
  

  )
}
