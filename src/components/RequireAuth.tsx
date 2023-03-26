import { FC } from "react";
import LoginPage from "./LoginPage"
import AuthService from "../services/auth.services";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    const userIsLogged = AuthService.isLogged(); 
 
    if (!userIsLogged) {
       return <LoginPage />;
    }
    return children;
 };

 export default RequireAuth