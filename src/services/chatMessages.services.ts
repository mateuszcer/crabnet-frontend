import axios from "axios";
import CommentInfo from "../types/CommentInfo";
import PostInfo from "../types/PostInfo";
import timeUtils from "../utils/time.utils";
import { API } from "./api_url";
import TokenService from "./token.services";
const API_URL = API + "/chat";
const USER_MESSAGES = API + "/chat/messages";



class ChatMessagesServices {

    async getMessages(username: string) {
        return axios
        .get(USER_MESSAGES + "/" + username, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

  


}

export default new ChatMessagesServices()