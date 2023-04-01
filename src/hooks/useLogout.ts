import { useState } from "react"
import authServices from "../services/auth.services"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch}= useAuthContext();
    
    const logout = async () => {
        localStorage.removeItem("auth")    
        dispatch({type: "LOGOUT"})
    }

    return { logout }
}