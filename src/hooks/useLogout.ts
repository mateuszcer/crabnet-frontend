import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch}= useAuthContext();
    
    const logout = async () => {
        localStorage.removeItem("auth")    
        localStorage.removeItem("user_info") 
        dispatch({type: "LOGOUT"})
    }

    return { logout }
}