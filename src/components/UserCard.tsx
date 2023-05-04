import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import userServices from '../services/user.services';
import User from '../types/UserInfo';
import pictureServices from '../services/picture.services';
import "../styles/UserCard.css"


export default function UserCard() {
    const [userInfo, setUserInfo] = useState<User>();
    const {logout} = useLogout()
    const navigate = useNavigate()

    useEffect(() => {
        const getUserInfo = async () => {
          const res = await userServices.getSelfInfo()
          if(res.status == 200){
            setUserInfo(res.data)
          }
          else if(res.status == 401) {
            logout()
        }
          
        } 
        getUserInfo();
      }, [])

  return (
    <div className="user-card-container">
                <div className="">
                    <div className="user-card-header" onClick={(e:any) => {navigate(`/profile/${userInfo?.username}`)}}>
                        <img src={pictureServices.getSelfPicture()} width="60px"></img>
                        
                        <h5 className="h5" style={{cursor:'pointer'}} >@{userInfo?.username}</h5>
                        <p className="h7 text-muted">{userInfo?.firstname} {userInfo?.lastname}</p>
                        
                    </div>
                    <div className="card-info">
                        <div className="card-bio">{userInfo?.bio}</div>
                        <div className="card-info-counters">

                        <div className="info-count">
                            <h5 className="h6 text-muted">Followers</h5>
                            <div className="h5">{userInfo?.followers.length}</div>
                        </div>
                        <div className="info-count separate">
                            <h5 className="h6 text-muted">Following</h5>
                            <div className="h5">{userInfo?.following.length}</div>
                        </div>
                        <div className="info-count ">
                            <h5 className="h6 text-muted">Posts</h5>
                            <div className="h5">{userInfo?.posts.length}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}
