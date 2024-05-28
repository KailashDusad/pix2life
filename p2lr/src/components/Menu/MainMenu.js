import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div>
      <h1>Main Menu</h1>
      <nav>
        <ul>
          <li><Link to="/scan">Scan</Link></li>
          <li><Link to="/manage">Manage</Link></li>
          <li><Link to="/create">Create</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
