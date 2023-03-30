import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

class TokenService {

    getToken = () => {
        return JSON.parse(localStorage.getItem("auth") || '""')["token"] 

    }

    hasToken = () => {
        const {state} = useContext(AuthContext)
        console.log(state)
        console.log(state.token, state.token != undefined)
        return (state.token != "" && state.token != undefined)
    }

    clearToken = () => {
        localStorage.removeItem("auth")
    }
}

export default new TokenService();