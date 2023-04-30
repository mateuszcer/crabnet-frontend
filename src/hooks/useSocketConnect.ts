import { useState } from "react"
import { useSocketContext } from "./useSocketContext"
import { Message } from "stompjs"
import tokenServices from "../services/token.services"
import SockJS from "sockjs-client"
import { API } from "../services/api_url"
import Stomp from 'stompjs'

export const useSocketConnect = () => {
    
    const {client, dispatch} = useSocketContext()
    const [isConnected, setIsConnected] = useState<boolean>((client && client.connected) || false)
    const connect = () => {
        const token = tokenServices.getToken();
        const socket = SockJS(API + "/chat?access_token=" + token);

        const new_client = Stomp.over(socket)
        console.log("wtf")
        
        new_client.connect({}, () => {
            dispatch({type: 'CONNECT', payload: new_client})
            setIsConnected(true)
            
        })
    }

    const subscribe = (endpoint: string, callback: (message: Message) => any) => {
        
        const sub = client.subscribe(endpoint, callback)

        

        dispatch({type: 'SUBSCRIBE', payload: client})

        return sub
    }

    return { connect, subscribe, isConnected}
}