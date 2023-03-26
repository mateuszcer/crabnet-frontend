
class TokenService {

    getToken = () => {
        return JSON.parse(localStorage.getItem("auth") || "")["token"] 

    }

    hasToken = () => {
        return JSON.parse(localStorage.getItem("auth") || '""')
    }

    clearToken = () => {
        localStorage.removeItem("auth")
    }
}

export default new TokenService();