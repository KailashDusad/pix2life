import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import CreateProject from './components/CreateProject';
import Scan from './components/Scan';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
