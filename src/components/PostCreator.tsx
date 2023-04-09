import axios from 'axios'
import React, { useState } from 'react'
import userPostServices from '../services/userPost.services'
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

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
    <div className="card gedf-card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#" role="tab" aria-controls="posts" aria-selected="true"> Create post</a>
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
