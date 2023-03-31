import axios from "axios";
import PostInfo from "../types/PostInfo";
import authServices from "./auth.services";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/user_post";
const CREATE_ENDPOINT = API_URL + "/create";
const NEWEST_ENDPOINT = API_URL + "/newest"
const LIKE_POST_ENDPOINT = API_URL + "/like"
const DISLIKE_POST_ENDPOINT = API_URL + "/dislike"
const DELETE_POST_ENDPOINT = API_URL + "/delete" 

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

    calculatePublishedTime = (creationTime: string) => {
        return Math.floor((Date.now() - Date.parse(creationTime)) / (1000*60))
    }

    formatPublishedTime = (creationTime: string) => {
        const timeInMin = this.calculatePublishedTime(creationTime)
        if(timeInMin >= 2880) {
            return Math.floor(timeInMin/1440) + " days ago"
        }
        else if(timeInMin >= 1440) {
            return " day ago"
        }
        else if(timeInMin >= 120) {
            return Math.floor(timeInMin / 60) + " hours ago";
        }
        else if(timeInMin >= 60) {
            return " hour ago"
        }
        else if(timeInMin == 1) {
            return "minute ago"
        }
        else if(timeInMin == 0) {
            return "just now"
        }
        return timeInMin + " minutes ago"
    }

    comparePosts = (postA: PostInfo, postB: PostInfo) => {
        return (this.calculatePublishedTime(postA.creationTime) - this.calculatePublishedTime(postB.creationTime))
        
    }


}

export default new UserPostServices()