import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SelectType.css';

const SelectType = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-center">
      <h2>Select Type</h2>
      <p style={{ color: 'black', fontSize: '0.8rem' }}>What do you want to happen after you've scanned your picture on the wall?</p>
      <p style={{ color: 'black', fontSize: '0.8rem' }}>Slide through an image gallery, show a video or play an audio, such as a Podcast?</p>
      <div className="mt-4">
        <button className="btn btn-danger btn-block mb-3" style={{ width: '80%' }} onClick={() => navigate('/new-image-gallery')}>GALLERY</button>
        <button className="btn btn-danger btn-block mb-3" style={{ width: '80%' }}>VIDEO</button>
        <button className="btn btn-danger btn-block mb-3" style={{ width: '80%' }}>CREATE</button>
      </div>
      <p style={{ color: 'black', fontSize: '0.8rem' }}>Tap the button of your choice to go to the next stage and start the upload process.</p>
      <footer className="mt-4">
        <small>An Info Quick product</small>
      </footer>
    </div>
  );
};

export default SelectType;
