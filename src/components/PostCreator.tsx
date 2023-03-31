import axios from 'axios'
import React, { useState } from 'react'
import userPostServices from '../services/userPost.services'
import PostInfo from '../types/PostInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function PostCreator({posts, setPosts}: {posts: Array<PostInfo>, setPosts: React.Dispatch<Array<PostInfo>> }) {
    const [postContent, setPostContent] = useState("")


    const handleInput = (e: any) => {
        setPostContent(e.target.value)
    }

    const submitPost = async (e: any) => {
        e.preventDefault()
        const response = await userPostServices.createPost(postContent)
        e.target[0].value = ""
        setPosts([response.data, ...posts])
        
    }

  return (
    <div className="card gedf-card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true"> Create post</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitPost}>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="message">post</label>
                                    <textarea className="form-control" id="message" rows={3} placeholder="What are you thinking?" onInput={e => handleInput(e)}></textarea>
                                </div>

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
                    </div>
                </div>
  )
}
