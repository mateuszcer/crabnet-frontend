import React from 'react'

export default function Picture({picture, id, onClick}: {picture: string, id: number, onClick: any}) {

  return (
    <img src={picture} onClick={onClick(picture, id)}></img>
  )
}
