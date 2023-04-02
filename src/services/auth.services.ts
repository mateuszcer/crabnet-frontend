import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TokenService from "./token.services";
import userServices from "./user.services";
const API_URL = "https://crabnet-app.herokuapp.com/auth";
const LOGIN_ENDPOINT = API_URL + "/signin";
const REGISTER_ENDPOINT = API_URL + "/signup";
class AuthService {
    async login(email: string, password: string) {
        return axios
            .post(LOGIN_ENDPOINT, {
                "email": email,
                "password": password
            })
            .then(response => {
                if (response.status == 200 && response.data.token) {
                  localStorage.setItem("auth", JSON.stringify(response.data));
                }
                return response;
              })
              .catch(error => error.response);
    }

    async registerUser(email: string, username: string, firstname: string, lastname: string, password: string, gender: string) {
        return axios
            .post(REGISTER_ENDPOINT, {
                "email": email,
                "username": username,
                "firstname": firstname,
                "lastname": lastname,
                "gender": gender,
                "password": password,
                "pictureId": gender == "Male" ? 1 : 4
            })
            .then(response => {
                return response;
              })
              .catch(error => error.response);

    }

    getUsername = () => {
        return JSON.parse(localStorage.getItem("auth") || '""')["username"]
    }


    isLogged = () => {
        //const { updateLoginStatus } = useContext(AuthContext)
    
        return TokenService.hasToken();
        // return {
        //  isLoggedIn: TokenService.hasToken(),
        //  loggedInRender: renderLoginLink,
        //  loggedOutRender: 
        // };
    }
}


export default new AuthService();