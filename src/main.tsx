import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { SocketContextProvider} from './context/SocketContext'

var global = window; // fix global is undefined in socketjs-client

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <SocketContextProvider>

      <BrowserRouter>

        <App />
      </BrowserRouter>,
    </SocketContextProvider>
  </AuthContextProvider>
)
