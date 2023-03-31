import React, { ImgHTMLAttributes, ReactElement } from 'react'
import pictureServices from '../services/picture.services'
import "../styles/Dashboard.css"
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment,  } from '@fortawesome/free-solid-svg-icons'
import userPostServices from '../services/userPost.services'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
export default function UserPost({id, authorUsername, content, creationTime, likedBy, authorPictureId}: PostInfo ) {
    const [likes, setLikes] = useState<number>(likedBy.length)
    const {state} = useAuthContext()
    const [isLiked, setIsLiked] = useState<boolean>(likedBy.includes(state.username || ""))
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


  return (
    <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src={pictureServices.getPicture(authorPictureId)} alt=""/>
                                </div>
                                <div className="ml-2">
                                <a href={"/profile/" + authorUsername}><div className="h5 m-0">@{authorUsername}</div></a>

                                </div>
                            </div>
                            <div>
                                <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div className="h6 dropdown-header">Configuration</div>
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Hide</a>
                                        <a className="dropdown-item" href="#">Report</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{creationTime} </div>
                
                        <p className="card-text">
                            {content}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div>{likes}</div>
                        {isLiked ?
                            <button className="btn liked" onClick={handleDislike}>
                            <FontAwesomeIcon color="#0275d8 "  icon={faThumbsUp} />
                                </button>
                                :
                                <button className="btn" onClick={handleLike}>
                            <FontAwesomeIcon   icon={faThumbsUp} />
                                </button>
                        }
                        
                        <button className="btn">
                    <FontAwesomeIcon  icon={faComment} />
                        </button>
              
                       
                    </div>
                </div>
  )
}
