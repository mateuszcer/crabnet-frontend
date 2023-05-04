import {Dispatch, SetStateAction, useState } from "react";
import PostInfo from "../types/PostInfo";
import { useLogout } from "../hooks/useLogout";
import { SocketContext } from "../context/SocketContext";
import MinimalUserInfo from "../types/MinimalUserInfo";
import pictureServices from "../services/picture.services";
import { useFollow } from "../hooks/useFollow";
import { useNavigate } from "react-router-dom";

export default function NewUser({user, dispatch, contacts}: {user: MinimalUserInfo, 
    dispatch: Dispatch<SetStateAction<MinimalUserInfo[]>>, contacts: Array<MinimalUserInfo>}) {

   const {handleFollow, handleUnfollow, error, followed, setFollowed} = useFollow(user.username || "")
   const [show, setShow] = useState<boolean>(true)   
    const navigate = useNavigate()

    const followClicked = (pictureId : number) => {
        handleFollow(pictureId)
        setShow(false)
        dispatch([...contacts, user])
    }
    return (
        <>
        {show ? 
        
        <div className="new-user" >
            <div className="new-user-info" onClick={(e: any) => navigate("/profile/" + user.username)}>

                    <img src={pictureServices.getPicture(user.pictureId)}></img>
                    <div>

                        <h5>{user.firstname} {user.lastname}</h5>
                        <p>@{user.username}</p>
                    </div>
            </div>
                    <button onClick={(e: any) => followClicked(user.pictureId || 1)} type="button" className="btn btn-primary btn-rounded ">
              Follow
            </button>
                    
                </div>
        
        :
        <></>}
        </>
    )
}

