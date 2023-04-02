import axios from "axios";
import PostInfo from "../types/PostInfo";
import timeUtils from "../utils/time.utils";
import authServices from "./auth.services";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/user_post";
const CREATE_ENDPOINT = API_URL + "/create";
const NEWEST_ENDPOINT = API_URL + "/newest"
const LIKE_POST_ENDPOINT = API_URL + "/like"
const DISLIKE_POST_ENDPOINT = API_URL + "/dislike"
const DELETE_POST_ENDPOINT = API_URL + "/delete" 
const COMMENT_CREATE_ENDPOINT = API_URL + "/comments/add"
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

    async dislikePost(id: string | number) {
        return axios
        .post(DISLIKE_POST_ENDPOINT+"?id=" + id, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async getPost(id: string | number) {
        return axios
        .post(API_URL + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async deletePost(id: string | number) {
        return axios
        .post(DELETE_POST_ENDPOINT + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async createComment(content: string, postId: number) {
        return axios
        .post(COMMENT_CREATE_ENDPOINT, {"content": content, "userPostId": postId}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    comparePosts = (postA: PostInfo, postB: PostInfo) => {
        return (timeUtils.calculatePublishedTime(postA.creationTime) - timeUtils.calculatePublishedTime(postB.creationTime))
        
    }




}

export default new UserPostServices()