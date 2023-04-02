import axios from "axios";
import CommentInfo from "../types/CommentInfo";
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
const COMMENT_LIKE_ENDPOINT = API_URL + "/comments/like"
const COMMENT_DELETE_ENDPOINT = API_URL + "/comments/delete"
const COMMENT_DISLIKE_ENDPOINT = API_URL + "/comments/dislike"


class UserPostServices {
    async createPost(content: string) {
        return axios
        .post(CREATE_ENDPOINT, {"content": content}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async getNewestPosts(username: string) {
        return axios
        .get(NEWEST_ENDPOINT + "/" + username, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async likePost(id: number) {
        return axios
        .post(LIKE_POST_ENDPOINT+"?id=" + id, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async dislikePost(id: string | number) {
        return axios
        .post(DISLIKE_POST_ENDPOINT+"?id=" + id, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async getPost(id: string | number) {
        return axios
        .post(API_URL + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async deletePost(id: string | number) {
        return axios
        .post(DELETE_POST_ENDPOINT + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async createComment(content: string, postId: number) {
        return axios
        .post(COMMENT_CREATE_ENDPOINT, {"content": content, "userPostId": postId}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async deleteComment(id: number) {
        return axios
        .post(COMMENT_DELETE_ENDPOINT + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async likeComment(id: number) {
        
        return axios
        .post(COMMENT_LIKE_ENDPOINT + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async dislikeComment(id: number) {
        return axios
        .post(COMMENT_DISLIKE_ENDPOINT + `/${id}`, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }




    comparePosts = (postA: PostInfo, postB: PostInfo) => {
        return (timeUtils.calculatePublishedTime(postA.creationTime) - timeUtils.calculatePublishedTime(postB.creationTime))
        
    }
    
    compareComments = (commentA: CommentInfo, commentB: CommentInfo) => {
        return (timeUtils.calculatePublishedTime(commentA.creationTime) - timeUtils.calculatePublishedTime(commentB.creationTime))
        
    }



}

export default new UserPostServices()