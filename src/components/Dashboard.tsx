import React from "react";
import '../styles/Dashboard.css'
import UserPost from "./UserPost";
import Navbar from "./Navbar";
import Feed from "./Feed";
export default function Dashboard() {
    return (
    <React.StrictMode>
            <Navbar/>
            <Feed/>


    </React.StrictMode>

    
    )
}

