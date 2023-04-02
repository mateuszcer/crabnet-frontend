import React, { useState } from 'react'
import CommentInfo from '../types/CommentInfo'
import PostInfo from '../types/PostInfo'
import Comment from './Comment'

import "../styles/Comment.css"
import pictureServices from '../services/picture.services'
import userPostServices from '../services/userPost.services'
export default function CommentsContainer({comments: commentsArray, sourceId: postId}: {comments: Array<CommentInfo>, sourceId: number}) {
    const [comments, setComments] = useState<Array<CommentInfo>>(commentsArray)
    const [content, setContent] = useState<string>("")
    const [error, setError] = useState<string>("")
    const createComment = async (e: any) => {
        e.preventDefault()
        const res = await userPostServices.createComment(content, postId)
        if(res.status == 200) {
            
            setComments([...comments, res.data].sort(userPostServices.compareComments))
            setContent("")
            setError("")
        }
        else {
            setError("Comment should be a maximum of 100 characters in size!")
            setContent("")
        }
    }
  return (
    <div className="comments-container">
        <div className="comment-creator">
            <img src={pictureServices.getSelfPicture()} width="35px"></img>
            <form className="comment-creator-form" onSubmit={createComment}>
                <input value={content} type="text" id="addANote" onInput={(e: any) => setContent(e.target.value)} className="form-control" placeholder="Type comment..." />
            </form>
           
        </div>
        {
                            error ?
                            <div className="alert alert-danger mt-2" role="alert" >{error}</div>
                            :
                            <></>
                        }
        {comments.map(comment => <Comment key={comment.id} {...comment}/>)}
    </div>
  )
}
