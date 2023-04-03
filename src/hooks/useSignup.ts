import { useState } from "react"
import authServices from "../services/auth.services"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>()
    const {dispatch}= useAuthContext();
    const signup = async (email: string, username: string, firstname: string, lastname: string, password: string, gender: string) => {
        setIsLoading(true)
        setError(null)

        const response = await authServices.registerUser(email, username, firstname, lastname, password, gender)
        if(!response) {
            setError("Something went wrong, please try again")
            setIsLoading(false)
        }
        if(response.status == 200){
            dispatch({type: 'LOGIN', payload: response})
            setIsLoading(false)
            return true
        }
        setIsLoading(false)
        setError(response.data)
        return false
        
            




    }

    return { signup, error, isLoading}
}