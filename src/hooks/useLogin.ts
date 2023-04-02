import { useState } from "react"
import authServices from "../services/auth.services"
import userServices from "../services/user.services"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const {dispatch}= useAuthContext();
    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await authServices.login(email, password)
        if(response.status == 200) {
            await userServices.getSelfInfo()
            dispatch({type: 'LOGIN', payload: response.data})
            setIsLoading(false)
            return true
        }
            
        setIsLoading(false)
        setError("Enter valid credentials")
        return false
        


    }

    return { login, error, isLoading}
}