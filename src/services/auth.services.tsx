import axios from "axios";
import { useContext } from "react";
import TokenService from "./token.services";
const API_URL = "http://localhost:8080/auth";
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
              .catch(error => error);
    }

    async registerUser(email: string, username: string, firstname: string, lastname: string, password: string, gender: string) {
        return axios
            .post(REGISTER_ENDPOINT, {
                "email": email,
                "username": username,
                "firstname": firstname,
                "lastname": lastname,
                "gender": gender,
                "password": password
            })
            .then(response => {
                return response.data;
              })
              .catch(error => error);

    }

    isLogged = () => {
        // const { updateLoginStatus } = useContext(AuthContext)
    
        return TokenService.hasToken();
        // return {
        //  isLoggedIn: TokenService.hasToken(),
        //  loggedInRender: renderLoginLink,
        //  loggedOutRender: 
        // };
    }
}


export default new AuthService();