interface User {
    username: string
    firstname: string
    lastname: string
    posts: Array<Post>
    followers: Array<string>
    following: Array<string>
}

interface Post {
    content: string,
    author: string,
    likedBy: Array<User>
}

export default User