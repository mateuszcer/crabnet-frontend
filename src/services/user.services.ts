import axios from "axios";
import MinimalUserInfo from "../types/MinimalUserInfo";
import { API } from "./api_url";
import authServices from "./auth.services";
import TokenService from "./token.services";

const API_URL = API+ "/user";
const FOLLOW_ENDPOINT = API_URL + "/follow";
const UNFOLLOW_ENDPOINT = API_URL + "/unfollow";
const ALL_USER_PATTERN_ENDPOINT = API_URL + "/all/";
const BIO_ENDPOINT = API_URL + "/bio"
const PICTURE_ENDPOINT = API_URL + "/picture"
const NEW_USERS_ENDPOINT = API_URL + "/new"

class UserServices {
    async getSelfInfo() {
        return this.getUserInfo(authServices.getUsername() || "")
            .then(response => {
                if(response.status == 200) {
                    localStorage.setItem("user_info", JSON.stringify(response.data))
                    
                }
                return response
            })
            .catch(error => error.response)
            
    }


    async getNewUsers() {
        return axios
        .get(NEW_USERS_ENDPOINT, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }


    isFollowed(username: string) {
        return this.getFollowing().some((follower: MinimalUserInfo) => follower.username == username)
    }

    isFollowing(username: string) {
        return this.getFollowers().some((follower: MinimalUserInfo) => follower.username == username)
    }

    getFollowers() {
        return JSON.parse(localStorage.getItem("user_info") || '""')["followers"]
    }


    getFollowing() {
        return JSON.parse(localStorage.getItem("user_info") || '""')["following"]
    }

    getPictureId() {
        return JSON.parse(localStorage.getItem("user_info") || '""')["pictureId"]
    }

    getSelfPosts() {
        return JSON.parse(localStorage.getItem("user_info") || '""')["posts"]
    }


    getSelfMinimalInfo() {
        const info = JSON.parse(localStorage.getItem("user_info") || '""')
        const user: MinimalUserInfo = {
            username: info.username,
            firstname: info.firstname,
            lastname: info.lastname,
            pictureId: info.pictureId
        };
        return user;
    }
    

    async getUserInfo(username: string) {
        return axios
        .get(API_URL + "/" + username, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async getAllUsersByPattern(pattern: string) {
        return axios
        .get(ALL_USER_PATTERN_ENDPOINT + pattern, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async follow(username: string) {
        return axios
        .post(FOLLOW_ENDPOINT + "/" + username, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async unFollow(username: string) {
        return axios
        .post(UNFOLLOW_ENDPOINT + "/" + username, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async updateBio(newBio: string) {
        return axios
        .post(BIO_ENDPOINT, {bio: newBio}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => response)
        .catch(error => error.response)
    }

    async updatePicture(newId: number) {
        return axios
        .post(PICTURE_ENDPOINT + "/" + newId, {}, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
        .then(response => {
            if(response.status == 200){
                const userInfo = JSON.parse(localStorage.getItem("user_info") || '""')
                userInfo["pictureId"] = newId
                localStorage.setItem("user_info", JSON.stringify(userInfo))
                return response
            }
        })
        .catch(error => error.response)
    }

    

   
   
}

export default new UserServices()