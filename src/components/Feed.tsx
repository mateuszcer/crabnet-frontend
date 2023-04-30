import { useContext, useEffect, useState } from "react";
import userServices from "../services/user.services";
import '../styles/Dashboard.css'
import User from "../types/UserInfo";
import PostCreator from "./PostCreator";
import UserCard from "./UserCard";
import UserPost from "./UserPost";
import PostInfo from "../types/PostInfo";
import { useLogout } from "../hooks/useLogout";
import userPostServices from "../services/userPost.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import ChatList from "./ChatList";
import timeUtils from "../utils/time.utils";
import { SocketContext } from "../context/SocketContext";

export default function Feed() {

    const {logout} = useLogout()
    const [posts, setPosts] = useState<Array<PostInfo>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUserInfo = async () => {
          
          const following = userServices.getFollowing()
          const fetchedPosts: Array<Array<PostInfo>> = []
            for(const user of following) {
                const username = user.username
                const res = await userPostServices.getNewestPosts(username)

                if(res.status == 200) {
                    fetchedPosts.push(res.data)
                }
                else if(res.status == 401) {
                    logout()
                }
            }
            fetchedPosts.push(userServices.getSelfPosts())
            const postsToRender = fetchedPosts.flat().sort(timeUtils.compareObjectWithDate)
            setPosts(postsToRender)
            setIsLoading(false)
          
        } 
        getUserInfo();
      }, [])
      
    return (
    <div>
        {
            isLoading ?
            <Loading/>
            :


    <div className="container gedf-wrapper main-container">
        <div className="row">
            <UserCard/>
            <div className="col-md-6 mt-4 gedf-main">

            
                <PostCreator posts={posts || []} setPosts={setPosts}/>
                
                {posts?.map(post => <UserPost key={post.id} {...post}/>)}
            </div>
            
            <div className="col-md-3 mt-3">
                <ChatList followers={userServices.getFollowing() || []}/>

                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">CrabNet is open source</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Become co-author</h6>
                        <p className="card-text">You can contribute to both the frontend and the backend codebases</p>
                        <a target="_blank" href="https://github.com/mateuszcer/crabnet-frontend" className="card-link">Frontend</a>
                        <a target="_blank" href="https://github.com/mateuszcer/crabnet-backend" className="card-link">Backend</a>
                    </div>
                </div>
                <div className="card gedf-card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Report bug</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Help us improve</h6>
                            <p className="card-text">If you encounter a bug or unexpected behavior, you can create a GitHub issue and provide a 
                            brief description of what happened.</p>
                            <a target="_blank" href="https://github.com/mateuszcer/crabnet-frontend/issues" className="card-link">Report an issue
                            <FontAwesomeIcon  className="link-icon" icon={faBug}/>
                            </a>
                            
                        </div>
                    </div>
            </div>
        </div>
    </div>
    }
    </div>
    )
}

