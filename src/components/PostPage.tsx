import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import userPostServices from '../services/userPost.services'
import PostInfo from '../types/PostInfo'
import PostInfoDefault from '../types/PostInfoDefault'
import Navbar from './Navbar'
import UserPost from './UserPost'

export default function PostPage() {
    const {id} = useParams()
    const [post, setPost] = useState<PostInfo>(PostInfoDefault)
    const {logout} = useLogout()
    useEffect(() => {
        const getPost = async () => {
            const res = await userPostServices.getPost(id || "")
            if(res.status == 200) {
                
                
                setPost(res.data)
                return
            }
            else if(res.status == 401) {
                logout()
            }
        }
        getPost()
    }, [])
  return (
    <React.StrictMode>
        <Navbar/>
    {
        <UserPost {...post}/>
        }
        </React.StrictMode>
  )
}
