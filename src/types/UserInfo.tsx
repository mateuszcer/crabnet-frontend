import PostInfo from "./PostInfo"


interface User {
    username: string
    firstname: string
    lastname: string
    posts: Array<PostInfo>
    followers: Array<string>
    following: Array<string>
}


export default User