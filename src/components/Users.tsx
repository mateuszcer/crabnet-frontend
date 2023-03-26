import axios from "axios"
import { useEffect, useState } from "react";
import TokenService from "../services/token.services";
type User = {
  username: string
  email: string
  token: string
}

function Users() {

  const [users, setUsers ] = useState<Array<User>>([])


  useEffect(() => {
    const getUsers = async () => {
      
  
      const { data: newUsers } = await axios.get("http://localhost:8080/user/all", {headers: {'Authorization': `Bearer ${TokenService.getToken()}`}})
      setUsers(newUsers);
    } 
    getUsers()
  }, [])

  return (
    
    <div >
        {users.map(elem => <div >{elem.email} {elem.username}</div>)}
    </div>
  )
}

export default Users
