import React, { useEffect, useState } from "react";
import userServices from "../services/user.services";
import '../styles/Dashboard.css'
import User from "../types/UserInfo";
import PostCreator from "./PostCreator";
import UserCard from "./UserCard";
import UserPost from "./UserPost";
import PostInfo from "../types/PostInfo";
import { useLogout } from "../hooks/useLogout";
import userPostServices from "../services/userPost.services";
import pictureServices from "../services/picture.services";

export default function Feed() {

    const [userInfo, setUserInfo] = useState<User>();
    const {logout} = useLogout()
    const [posts, setPosts] = useState<Array<PostInfo>>([]);
    const {comparePosts, formatPublishedTime} = userPostServices 

   

    useEffect(() => {
        const getUserInfo = async () => {
          const following = userServices.getFollowing()
          const fetchedPosts: Array<Array<PostInfo>> = []
            for(const username of following) {
                const res = await userPostServices.getNewestPosts(username)

                if(res.status == 200) {
                    console.log(res.data)
                    fetchedPosts.push(res.data)
                }
                else if(res.status == 401) {
                    logout()
                }
            }
            const postsToRender = fetchedPosts.flat().sort(comparePosts)
            setPosts(postsToRender)
          
        } 
        getUserInfo();
      }, [])
    return (
    <div>


    <div className="container gedf-wrapper">
        <div className="row">
            <UserCard/>
            <div className="col-md-6 gedf-main">

            
                <PostCreator posts={posts || []} setPosts={setPosts}/>
                {posts?.map(post => <UserPost id={post.id} key={post.id} authorUsername={post.authorUsername} content={post.content} 
                creationTime={post.creationTime} 
                likedBy={post.likedBy} authorPictureId={post.authorPictureId || 1}/>)}
            </div>
            <div className="col-md-3">
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Leave a star on github</h5>
                        <a href="#" className="card-link">Project</a>
                    </div>
                </div>
                <div className="card gedf-card">
                       
                    </div>
            </div>
        </div>
    </div>
    </div>
    )
}

