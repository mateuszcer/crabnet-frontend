import MinimalUserInfo from "./MinimalUserInfo"

export default interface ChatMessage {
    message: string
    sender: MinimalUserInfo
    creationTime: string
  }
  