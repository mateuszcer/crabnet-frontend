import Stomp from 'stompjs'
import { Dispatch, createContext, useReducer } from 'react';




export const SocketContext  = createContext<
    {client: Stomp.Client, dispatch: Dispatch<any>} | undefined>(
    undefined
    )

export const socketReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'CREATE': 
            return action.payload
        case 'CONNECT':
            return action.payload
        case 'SUBSCRIBE':
            return action.payload
        default:
            return state
    }
}


export const SocketContextProvider = ({ children }: any) => {
    const [client, dispatch] = useReducer(socketReducer, undefined) 


    return (
        <SocketContext.Provider value={{client, dispatch}}>
            { children }
        </SocketContext.Provider>
    )
}
