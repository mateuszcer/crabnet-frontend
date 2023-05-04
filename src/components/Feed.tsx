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
import MinimalUserInfo from "../types/MinimalUserInfo";
import pictureServices from "../services/picture.services";
import NewUser from "./NewUser";
import { useAuthContext } from "../hooks/useAuthContext";
import authServices from "../services/auth.services";

export default function Feed() {

    const {logout} = useLogout()
    const [posts, setPosts] = useState<Array<PostInfo>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [newUsers, setNewUsers] = useState<Array<MinimalUserInfo>>()
    const {state} = useAuthContext()
    const [contacts, setContacts] = useState<Array<MinimalUserInfo>>([])

    useEffect(() => {
        const getUserInfo = async () => {
          
          const following = userServices.getFollowing()
          setContacts(following)
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
            const new_users_res = await userServices.getNewUsers()
            const new_users = new_users_res.data.filter((u : MinimalUserInfo) => {
                return !userServices.isFollowed(u.username) && u.username != authServices.getUsername()})
            setNewUsers(new_users)
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

    <div className="dashboard-container">
        
            <UserCard/>
            <div className="feed-posts-container">

            
                <PostCreator posts={posts || []} setPosts={setPosts}/>
                <div className="dashboard-posts">
                    {posts?.map(post => <UserPost key={post.id} {...post}/>)}
                </div>
            </div>
            
            <div className="new-users-container">
                <div className="new-users-header">
                    <h5>New users</h5>

                </div>
                {newUsers?.map(u => 
                
                <NewUser user={u} dispatch={setContacts} contacts={contacts}></NewUser>
                )}

            </div>
            <ChatList followers={contacts || []}/>
            
            
    </div>
    }
    </div>
    )
}

