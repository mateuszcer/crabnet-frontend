import { createContext, Dispatch, useReducer } from "react";
import UserAuthInfo from "../types/UserAuthInfo";

export const AuthContext = createContext<
{
    state: UserAuthInfo;
    dispatch: Dispatch<any>;
  }
>({
    state: {"token": null, "username": null},
    dispatch: () => null
  });

export const authReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return {auth: null}
        default:
            return state
    }
}


export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, JSON.parse(localStorage.getItem("auth") || '""') || {auth: null})


    return (
        <AuthContext.Provider value={{state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

