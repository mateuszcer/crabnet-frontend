export default interface CommentInfo {
    content: string
    authorUsername: string
    authorPictureId: number
    sourceId: number
    id: number
    likedBy: Array<string>
    creationTime: string
    
}