import { FC } from "react";
import LoginPage from "./LoginPage"
import AuthService from "../services/auth.services";
import { Navigate } from "react-router-dom";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    const userIsLogged = AuthService.isLogged(); 
 
    if (!userIsLogged) {
       return <Navigate to={"/login"}/>;
    }
    return children;
 };

 export default RequireAuth