import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from '../src/Redux/Store/Store.js'
import { Provider } from "react-redux";
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'https://back.paravosdistribuidora.com.ar'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
