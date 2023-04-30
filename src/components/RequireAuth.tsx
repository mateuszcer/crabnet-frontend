import { FC } from "react";
import LoginPage from "./LoginPage"
import AuthService from "../services/auth.services";
import { Navigate } from "react-router-dom";
import { useSocketConnect } from "../hooks/useSocketConnect";
import Loading from "./Loading";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    const userIsLogged = AuthService.isLogged(); 
      const {connect, isConnected} = useSocketConnect()
      
      if(!isConnected) {
         connect()
      }
    return (
      !userIsLogged ? 
      <Navigate to={"/login"}/> :

         isConnected ? 
         children
         :
         
         <Loading/>
         
        
      );
 };

 export default RequireAuth