import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <GoogleOAuthProvider clientId='834574789609-aj137odi1kvt7se2nkjmh6cddvbe6nog.apps.googleusercontent.com'>
  // </GoogleOAuthProvider> 
   
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
