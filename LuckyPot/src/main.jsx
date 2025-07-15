import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Home from './components/Home/Home.jsx'
import BuyTicket from './components/BuyTicket/BuyTicket.jsx'
import Winner from './components/Winner/Winner.jsx'
const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [{
       path : "",
       element : <Home/>
    },
  {
    path : "/BuyTicket",
    element : <BuyTicket/>
  },
  {
    path : "/Winner",
    element : <Winner/>
  }]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
