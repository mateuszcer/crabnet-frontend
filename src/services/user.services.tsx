import axios from "axios";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/user";
const SELF_INFO_ENDPOINT = API_URL + "/self";


class UserServices {
    async getSelfInfo() {
        return axios
        .get(SELF_INFO_ENDPOINT, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

    async getUserInfo(username: string) {
        return axios
        .get(API_URL + "/" + username, {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
    }

   
}

export default new UserServices()