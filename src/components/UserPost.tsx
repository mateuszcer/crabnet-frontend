import React, { ImgHTMLAttributes, ReactElement } from 'react'
import pictureServices from '../services/picture.services'
import "../styles/Dashboard.css"
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import userPostServices from '../services/userPost.services'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Dropdown } from 'react-bootstrap'
import Popup from 'reactjs-popup'
import "../styles/UserPost.css"


export default function UserPost({id, authorUsername, content, creationTime, likedBy, authorPictureId}: PostInfo ) {
    const [likes, setLikes] = useState<number>(likedBy.length)
    const {state} = useAuthContext()
    const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(state.username || ""))
    const [isMine, setIsMine] = useState<boolean>(authorUsername === state.username)
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const postUrl = "http://127.0.0.1:5173/post/" + id
    const handleLike = async (e: any) => {
        const res = await userPostServices.likePost(id)
        if(res.status == 200) {
            setLikes(likes+1)
            setIsLiked(true)
            return    
        }
        
        
    }

    const handleShareLink = (e: any) => {
        navigator.clipboard.writeText(postUrl)
        return postUrl
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


  return (
    <React.StrictMode>

    
    {
        isVisible ?
    <div className="card gedf-card post">
                    <div className="card-header">
                        <div className="card-header-container">
                                <div className="post-info">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="45" src={pictureServices.getPicture(authorPictureId)} alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <a href={"/profile/" + authorUsername}><div className="h5 m-0">@{authorUsername}</div></a>
                                    </div>
                                    
                                </div>
                                <div>

                                    <Dropdown>
                                        <Dropdown.Toggle style={{border: "none", backgroundColor: "transparent"}} variant="secondary" >
                                        <FontAwesomeIcon className="" size="lg" color="#332D2D" icon={faEllipsisH}/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <Popup trigger={
                                            <Dropdown.Item >Share post link</Dropdown.Item>
                                          } position="right center">
                                            <div>{postUrl} copy url</div>  
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
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{userPostServices.formatPublishedTime(creationTime)} </div>
                
                        <p className="card-text">
                            {content}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div>{likes}</div>
                        {isLiked ?
                            <button className="btn" onClick={handleDislike}>
                            <FontAwesomeIcon color="#0275d8 "  icon={faThumbsUp} />
                                </button>
                                :
                                <button className="btn like-control" onClick={handleLike}>
                            <FontAwesomeIcon   icon={faThumbsUp} />
                                </button>
                        }
                        
                        <button className="btn">
                    <FontAwesomeIcon  icon={faComment} />
                        </button>
              
                       
                    </div>
                </div>
                :
                <></>}
                </React.StrictMode>
  )
}
