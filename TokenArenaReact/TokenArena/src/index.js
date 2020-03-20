import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app"
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

require('dotenv').config()
console.log(process.env.REACT_APP_TESTSTR)

ReactDOM.render(
   <Provider store={store}>
     <BrowserRouter>
         <App />
     </BrowserRouter>
   </Provider>,
    document.getElementById("root")
)
