import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import SelectType from './components/SelectType';
import NewImageGallery from './components/NewImageGallery';
import './App.css';
// import { GoogleLogin } from '@react-oauth/google';

const App = () => {
//   const responseMessage = (response) => {
//     console.log(response);
// };
// const errorMessage = (error) => {
//     console.log(error);
// };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/select-type" element={<SelectType />} />
        <Route path="/new-image-gallery" element={<NewImageGallery />} />
      </Routes>
    </Router>
  );
};

export default App;
