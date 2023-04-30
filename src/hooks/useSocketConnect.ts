import { useState } from "react"
import { useSocketContext } from "./useSocketContext"
import { Message } from "stompjs"
import tokenServices from "../services/token.services"
import SockJS from "sockjs-client"
import { API } from "../services/api_url"
import Stomp from 'stompjs'
import ChatMessage from "../types/ChatMessage"
import ChatMessageDefault from "../types/ChatMessageDefault"

export const useSocketConnect = () => {
    
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const {client, dispatch} = useSocketContext()
    const [recMessage, setRecMessage] = useState<ChatMessage>(ChatMessageDefault)

    const token = tokenServices.getToken();
    const socket = SockJS(API + "/chat?access_token=" + token);


    const connect = () => {
        const new_client = Stomp.over(socket)
        
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

    return { connect, subscribe, isConnected, recMessage}
}