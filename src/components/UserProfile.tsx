import React from 'react'
import "../styles/UserProfile.css"
import UserInfo from "../types/UserInfo"
import { useState } from 'react';
import UserServices from '../services/user.services';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Navbar from './Navbar';
import userServices from '../services/user.services';
import AuthService from '../services/auth.services'
import { useFollow } from '../hooks/useFollow';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import pictureServices from '../services/picture.services';
import PicturePicker from './PicturePicker';
import UserPost from './UserPost';
import userPostServices from '../services/userPost.services';

export default function UserProfile() {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [isMe, setIsMe] = useState<boolean>(false);
    const {username} = useParams();
    const {logout} = useLogout()
    const [edit, setEdit] = useState<boolean>(false)
    const {handleFollow, handleUnfollow, error, followed} = useFollow(username || "")
    const [content, setContent] = useState<string>("")
    const [bioError, setBioError] = useState<string>()
    const [bio, setBio] = useState<string>("")
    const handleBioChange = async (e: any) => {
      if(!edit){
        setEdit(true)
        return
      }
      if(content === bio) {
        setEdit(false)
        
        return
      }
      const res = await userServices.updateBio(content)
      if(res.status == 200) {
        setEdit(false)
        setBioError("")
        if(userInfo) {
          userInfo["bio"] = content
        }
        setBio(content)
      }
      else{
        setBioError(res.data)
      }
      
    }
    useEffect(() => {
        const getUserInfo = async () => {
          const res = await UserServices.getUserInfo(username || "")
          
          if(res.status == 401) {
            logout()
            return
          }
          if(res.data.username === AuthService.getUsername()){
            setIsMe(true)
          }
          res.data["posts"] = res.data["posts"].sort(userPostServices.comparePosts)
          setUserInfo(res.data)
          setBio(res.data["bio"])
          setContent(res.data["bio"])
        } 
        getUserInfo();
      }, [])


  return (
    <React.StrictMode>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" ></link>
    <section className="vh-100 test" style={{backgroundColor: "#eee"}}>

    <Navbar/>
    
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center mt-5">
      <div className="col-md-12 col-xl-4">

        <div className="card" style={{borderRadius: "15px"}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-2 displ">
              <div className="">

                <img src={pictureServices.getPicture(userInfo?.pictureId || 1)}
                  className="rounded-circle img-fluid" style={{width: "100px"}} />
                  <div className="edit-wrapper">
                    {isMe ?
                  <Popup trigger={
                    <button type="button" className="btn btn-success btn-floating edit" >
                    <FontAwesomeIcon  size="xs" icon={faPencil} />
                </button>
                  } position="right center">
                  <PicturePicker/>
                  </Popup>
                  :
                  <></>  
                  }
                  </div>
              </div>
            </div>
            <h4 className="mb-2">{userInfo?.firstname} {userInfo?.lastname} </h4>
            
            <p className="text-muted mb-3">@{userInfo?.username}</p>
            {edit ? 
            <textarea  onChange={e => setContent(e.target.value)} className="form-control mb-4" defaultValue={bio}></textarea>
            :
            <p className="text-muted mb-4 h6">{bio}</p>
          }
            {
              isMe ?
              <button  onClick={handleBioChange} type="button" className="btn btn-primary btn-rounded">
              {edit ? "Submit" : "Edit bio"}
            </button>
             :
             (
              followed ?
              <button onClick={handleUnfollow} type="button" className="btn btn-primary btn-rounded btn-danger">
              Unfollow
            </button>
              :
              <button onClick={handleFollow} type="button" className="btn btn-primary btn-rounded ">
              Follow
            </button>)
            }
            {(error || bioError) && <div className="alert alert-danger mt-2" role="alert">
            {error || bioError}
              </div>}
            <div className="d-flex justify-content-center text-center mt-4 mb-2">
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.posts.length}</p>
                <p className="text-muted mb-0">Posts created</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.following.length}</p>
                <p className="text-muted mb-0">Following</p>
              </div>
              <div className="px-3">
                <p className="mb-2 h5">{userInfo?.followers.length}</p>
                <p className="text-muted mb-0">Followers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className="posts">

            {userInfo?.posts.map(post => <UserPost key={post.id} {...post} />)}
    </div>
  </div>
</section>
    </React.StrictMode>
  )
}
