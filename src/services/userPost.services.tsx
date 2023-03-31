import axios from "axios";
import authServices from "./auth.services";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/user_post";
const CREATE_ENDPOINT = API_URL + "/create";
const NEWEST_ENDPOINT = API_URL + "/newest"
const LIKE_POST_ENDPOINT = API_URL + "/like"
const DISLIKE_POST_ENDPOINT = API_URL + "/dislike"
class UserPostServices {
    async createPost(content: string) {
        return axios
        .post(CREATE_ENDPOINT, {"content": content}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async getNewestPosts(username: string) {
        return axios
        .get(NEWEST_ENDPOINT + "/" + username, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async likePost(id: number) {
        return axios
        .post(LIKE_POST_ENDPOINT+"?id=" + id, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async dislikePost(id: number) {
        return axios
        .post(DISLIKE_POST_ENDPOINT+"?id=" + id, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

   
}

export default new UserPostServices()