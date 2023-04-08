import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EmptyChatPage() {
    const navigate = useNavigate()
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-3 fw-bold mb-4">No one to message...</h1>
                <img src="./sadcrab.png" width="250px"></img>
                <p className="lead mt-2">
                    Follow some people and start chatting!
                  </p>
                <p onClick={(e: any) => navigate("/")} className="btn btn-primary">Go Home</p>
            </div>
        </div>
  )
}
