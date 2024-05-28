import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import MainMenu from './components/Menu/MainMenu';
import CreateProject from './components/ProjectCreation/CreateProject';
import ScanImage from './components/Scan/ScanImage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/scan" element={<ScanImage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
