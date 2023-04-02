import axios from "axios";
import authServices from "./auth.services";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/user";
const FOLLOW_ENDPOINT = API_URL + "/follow";
const UNFOLLOW_ENDPOINT = API_URL + "/unfollow";
const ALL_USER_PATTERN_ENDPOINT = API_URL + "/all/";
const BIO_ENDPOINT = API_URL + "/bio"
const PICTURE_ENDPOINT = API_URL + "/picture"

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

    isFollowed(username: string) {
        return this.getFollowing().includes(username)
    }

    isFollowing(username: string) {
        return this.getFollowers().includes(username)
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