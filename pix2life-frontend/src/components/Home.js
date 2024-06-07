import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import image from './image.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="text-center">
        <img src={image} alt="Pix2Life Logo" className="img-fluid mb-3" style={{ paddingTop: '100px' }} />
      </div>
      <div className="w-100 text-center" style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <button className="btn btn-danger btn-block mb-3" style={{ width: '45%' }} >SCAN</button>
        <button className="btn btn-danger btn-block mb-3" style={{ width: '45%' }}>MANAGE</button>
        <button className="btn btn-danger btn-block" style={{ width: '45%' }}onClick={() => navigate('/create-project')}>CREATE</button>
      </div>
      <footer className="mt-auto text-center">
        <small>An Info Quick product</small>
      </footer>
    </div>
  );
};

export default Home;
