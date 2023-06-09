import React, { useState } from 'react'
import userPostServices from '../services/userPost.services'
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPen } from '@fortawesome/free-solid-svg-icons'
import "../styles/PostCreator.css"
export default function PostCreator({posts, setPosts}: {posts: Array<PostInfo>, setPosts: React.Dispatch<Array<PostInfo>> }) {
    const [postContent, setPostContent] = useState("")
    const [error, setError] = useState("")

    const handleInput = (e: any) => {
        setPostContent(e.target.value)
    }

    const submitPost = async (e: any) => {
        e.preventDefault()
        const response = await userPostServices.createPost(postContent)
        e.target[0].value = ""
        if(response.status == 200)
            setPosts([response.data, ...posts])
        else {
            setError("Post content size should be between 1 and 255 characters in length!")
        }
    }

  return (
    <div className="post-creator">
                    <div className="card-header post-creator-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">      
                                <p className="nav-link active" > 
                                <FontAwesomeIcon className="post-pen" icon={faPen} />
                                Create post</p>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitPost}>

                        <div className="tab-content" id="myTabContent">
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="message">post</label>
                                    <textarea required className="form-control" id="message" rows={3} placeholder="What are you thinking?" onInput={e => handleInput(e)}></textarea>
                                </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary " >
                                    
                                    Share
                                    <FontAwesomeIcon className="ml-2" size="xs" icon={faPaperPlane}/>
                                    
                                    </button>
                            </div>  
                        </div>
                        </form>
                        {
                            error ?
                            <div className="alert alert-danger mt-2" role="alert" >{error}</div>
                            :
                            <></>
                        }
                    </div>
                </div>
  )
}
