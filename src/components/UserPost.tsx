import React, { ImgHTMLAttributes, ReactElement, useEffect } from 'react'
import pictureServices from '../services/picture.services'
import "../styles/Dashboard.css"
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faEllipsisH , faClock, faHeart} from '@fortawesome/free-solid-svg-icons'
import userPostServices from '../services/userPost.services'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Dropdown } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import "../styles/UserPost.css"
import { Navigate, useNavigate } from 'react-router-dom'
import userServices from '../services/user.services'
import timeUtils from '../utils/time.utils'
import Comment from './Comment'
import CommentsContainer from './CommentsContainer'
import CommentInfo from '../types/CommentInfo'


export default function UserPost({id, authorUsername, content, creationTime, likedBy, comments, authorPictureId}: PostInfo ) {
    const {state} = useAuthContext()
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isMine, setIsMine] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [likes, setLikes] = useState<number>(0)
    const [commentsArr, setCommentsArr] = useState<Array<CommentInfo>>([])

    
    const navigate = useNavigate()
    const handleLike = async (e: any) => {
        const res = await userPostServices.likePost(id)
        if(res.status == 200) {
            setLikes(likes+1)
            setIsLiked(true)
            return    
        }
        
        
    }


    const handleDislike = async (e: any) => {
        const res = await userPostServices.dislikePost(id)
        if(res.status == 200) {
            setLikes(likes-1)
            setIsLiked(false)
            return    
        }
        
        
    }

    const handleDelete = async (e: any) => {
        const res = await userPostServices.deletePost(id)
        if(res.status == 200) {
            setIsVisible(false)
            //window.location.reload()
        }
    }

    useEffect(() => {
        setIsLiked(likedBy.includes(state.username || ""))
        setIsMine(authorUsername === state.username)
        setLikes(likedBy.length)
        setCommentsArr(comments)
    }, [])


  return (
    <React.StrictMode>

    
    {
        isVisible ?
            <div className="post">
                    <div className="post-header">
                        <div className="post-header-container">
                                <div className="post-info">
                                    <div className="author-profile" onClick={e => navigate(`/profile/${authorUsername}`)}>
                                        
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="45" src={pictureServices.getPicture(authorPictureId)} alt=""/>
                                    </div>
                                    

                                    <div className="post-author-info">
                                        <div className="m-0 author-username">@{authorUsername}</div>
                                        <p className="text-muted time"> 
                                        <FontAwesomeIcon size="xs" className="clock-icon" icon={faClock} />
                                        {timeUtils.formatPublishedTime(creationTime)}
                                        </p>
                                        
                                    </div>
                                    
                                    </div>
                                    {
                                    userServices.isFollowed(authorUsername) ?
                                    <p className="following-indicator">
                                        Following
                                    </p>
                                    :
                                    <></>
                                    }
                                    </div>
                                <div>

                                    <Dropdown>
                                        <Dropdown.Toggle className="post-options" variant="secondary" >
                                        <FontAwesomeIcon className="" size="lg" color="#332D2D" icon={faEllipsisH}/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <Popup trigger={
                                            <Dropdown.Item >Share post link</Dropdown.Item>
                                          } position="bottom center">
                                            <Navigate to={`/post/${id}`}/>  
                                            </Popup>
                                          
                                            {isMine ? 
                                            <Dropdown.Item onClick={handleDelete}>Remove post</Dropdown.Item>
                                            :
                                            <></>
                                            }
                                        </Dropdown.Menu>
                                          </Dropdown>
                                </div>
                        </div>

                    </div>
                        <p className="post-content">
                            {content}
                        </p>
                    
                    <div className="post-footer">
                        <div className="counters">
                            <div className="like-counter">
                                <FontAwesomeIcon color="rgb(223, 71, 89, .88) " size="sm" icon={faHeart}/>
                                <p>{likes}</p>
                            </div>
                        <div className="comments-counter" onClick={e => setShowComments(!showComments)}>
                            <p>{comments.length}</p>
                            <FontAwesomeIcon  size="sm" icon={faComment} />
                        </div>

                        </div>
                        <div className="post-footer-actions">

                            <div className="post-footer-action">
                                
                                <div className="action like-action" onClick={isLiked ? handleDislike : handleLike}>
                                {isLiked ?
                                    <button className="btn" >
                                    <FontAwesomeIcon color="#df4759 "  icon={faHeart} />
                                        </button>
                                        :
                                        <button className="btn like-control" >
                                    <FontAwesomeIcon   icon={faHeart} />
                                        </button>
                                }    
                                <p>Like</p>
                                </div>

                            </div>
                            
                            <div className="post-footer-action">
                                <div className="action" onClick={e => setShowComments(!showComments)}>

                                    <button className="btn">
                                        <FontAwesomeIcon  icon={faComment} />
                                    </button>
                                    <p>Comment</p>
                                </div>
                            </div>

                        </div>

                        

              
                       
                    </div>
                    {
                        showComments ?
                        <CommentsContainer comments={commentsArr} sourceId={id}/>
                    :
                    <></>
                    }
                    
                </div>
                :
                <></>}
                </React.StrictMode>
  )
}
