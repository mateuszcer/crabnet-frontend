import React, { useState } from 'react'
import pictureServices from '../services/picture.services'
import userServices from '../services/user.services'
import "../styles/PicturePicker.css"


export default function PicturePicker() {
  const pictures = pictureServices.getAll()
  const [picked, setPicked] = useState<boolean>(false)
  const [pickedId, setPickedId] = useState<number>(1)

  const handlePicturePick = (id: number) => {
    setPickedId(id)
    setPicked(true)
  }

  const handlePictureSubmit = async (e: any) => {
    const res = await userServices.updatePicture(pickedId)
    if(res.status == 200) {
      window.location.reload();  
    }
  }

  return (
    <div className="fluid-container picture-container">
       
        
        {pictures.map((elem, index) => <img key={index} onClick={(e) => handlePicturePick(index+1)} src={elem}></img>)}
        {picked ?
        <button onClick={handlePictureSubmit} className="btn btn-primary">Change profile picture</button>  :
        <></>
      }
        
    </div>
  )
}
