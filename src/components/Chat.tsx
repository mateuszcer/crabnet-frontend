import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import chatMessagesServices from '../services/chatMessages.services';
import pictureServices from '../services/picture.services';
import tokenServices from '../services/token.services';
import ChatMessage from '../types/ChatMessage';
import UserMessage from './UserMessage';
import "../styles/ChatRoom.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import MinimalUserInfo from '../types/MinimalUserInfo';
import ChatMessageDefault from '../types/ChatMessageDefault';
import Loading from './Loading';
import { API } from '../services/api_url';
import timeUtils from '../utils/time.utils';


export default function Chat({username, firstname, lastname, pictureId}: MinimalUserInfo) {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Array<ChatMessage>>([]) 
  const [stompClient, setStompClient] = useState<any>();
  const [serverMessage ,setServerMessage] = useState<ChatMessage>(ChatMessageDefault)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const navigate = useNavigate()
  const showMessage = (message: ChatMessage) => {
    
    setServerMessage(message)
    
  }
    const connect = () => {
        let token = tokenServices.getToken();
        let socket = SockJS(API + "/chat?access_token=" + token);
        let xstompClient = Stomp.over(socket);
        
        xstompClient.connect({}, function (frame: any) {
        
          xstompClient.subscribe('/user/queue/chat.message', function (messageRes: any) {
            showMessage(JSON.parse(messageRes.body))
          });
        });
        setStompClient(xstompClient)
        
        
      }
       
       function sendName() {
        
      
        stompClient.send("/app/chat.message", {}, JSON.stringify({'message': message, 
        'receiverUsername': username}));
       }

       useEffect(() => {
        
        connect();
        
       }, [])
      
       useEffect(() => {
        const getMessages = async () => {
          const res = await chatMessagesServices.getMessages(username || "")

          
          if(res.status == 200) {
            setMessages([...res.data.sort(timeUtils.compareObjectWithDate)])
            setIsLoading(false)
          }
        } 
        getMessages();
      }, [username])
      
       useEffect(() => {
        
        setMessages([serverMessage, ...messages])
       }, [serverMessage])

       const handleSubmit = (e: any) => {
          e.preventDefault()
          sendName()
          setMessage("")
       }
  return (
    <>
      {isLoading  ?
      <Loading/> :
      <>
      
      <div className="chat-header" >
        <img  src={pictureServices.getPicture(pictureId)}/>
        <h5 onClick={(e: any) => navigate(`/profile/${username}`)}>{firstname} {lastname}</h5>
      </div>
     
      <div className="pt-3 pe-3 messages">
          
            {
              messages.map((m, index) =>  <UserMessage key={index} {...m} />)
            }
      
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input value={message} className="form-control" onInput={(e: any) => setMessage(e.target.value)} placeholder="Type message"></input>
        <button className="btn "> 
        <FontAwesomeIcon color="#3B71CA" icon={faPaperPlane} />
        </button>
      </form>
      </>
    }
      </>
  )
}
