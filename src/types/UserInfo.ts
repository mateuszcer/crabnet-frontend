import MinimalUserInfo from "./MinimalUserInfo"
import PostInfo from "./PostInfo"


interface User {
    username: string
    firstname: string
    lastname: string
    posts: Array<PostInfo>
    followers: Array<MinimalUserInfo>
    following: Array<MinimalUserInfo>
    bio: string
    pictureId: number
}


export default User