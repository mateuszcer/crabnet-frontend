import CommentInfo from "./CommentInfo"

export default interface PostInfo {
    content: string
    authorUsername: string
    creationTime: string
    likedBy: Array<string>
    comments: Array<CommentInfo>
    id: number
    authorPictureId: number
}
