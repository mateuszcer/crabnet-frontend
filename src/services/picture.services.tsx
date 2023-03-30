import men1 from "../assets/profile_pictures/m1.png"
import men2 from "../assets/profile_pictures/m2.png"
import men3 from "../assets/profile_pictures/m3.png"
import women1 from "../assets/profile_pictures/w1.png"
import women2 from "../assets/profile_pictures/w2.png"
import women3 from "../assets/profile_pictures/w3.png"
import userServices from "./user.services"

class PictureServices {
    private pictures =[men1, men2, men3, women1, women2, women3]
    getPicture = (id: number) => {
        if(id >= this.pictures.length)
            return this.pictures[0]
        return this.pictures[id-1]
    }

    getAll = () => {
        return [men1, men2, men3, women1, women2, women3]
    }

    getSelfPicture = () => {
        return this.getPicture(userServices.getPictureId() || 1)
    }
}


export default new PictureServices()
