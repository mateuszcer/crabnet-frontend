import { useEffect, useState } from "react"
import userServices from "../services/user.services"
import { useAuthContext } from "./useAuthContext"

export const useFollow = (username: string) => {
    const [followed, setFollowed] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
      setFollowed(userServices.getFollowing().includes(username))
      

    }, [])
    
    const handleUnfollow = async (e: any) => {
        setError("")
        const response = await userServices.unFollow(username || "");
        if(response.status==200) {
            setFollowed(false)
            const user_info = JSON.parse(localStorage.getItem("user_info") || '""')
            const following = user_info["following"]
            for( var i = 0; i < following.length; i++){ 
    
                if ( following[i] === username) { 

                    following.splice(i, 1); 
                }
            
            }
            user_info["following"] = following
            localStorage.setItem("user_info", JSON.stringify(user_info))
            return;
        }
        setError("Something went wrong")
    }

    const handleFollow = async (e: any) => {
        setError("")
        const response = await userServices.follow(username || "");
        if(response.status == 200){
            setFollowed(true)
            const user_info = JSON.parse(localStorage.getItem("user_info") || '""')
            const following = user_info["following"]
            following.push(username)
            user_info["following"] = following
            localStorage.setItem("user_info", JSON.stringify(user_info))
            return;
        }
        setError("Something went wrong")
        return;
      
  }

  return {followed, error, handleFollow, handleUnfollow}
}