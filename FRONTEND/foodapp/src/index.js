import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Rt } from "react-router-dom";
import axios from 'axios';

// 🚀 Dynamic Cloud Backend API Redirect Interceptor
axios.interceptors.request.use((config) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
  if (apiBaseURL && config.url && config.url.startsWith("http://localhost:1004")) {
    config.url = config.url.replace("http://localhost:1004", apiBaseURL);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rt>
      <App />
    </Rt>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
