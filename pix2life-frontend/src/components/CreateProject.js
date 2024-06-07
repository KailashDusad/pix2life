import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateProject.css';
import image from './image.png';
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Name:', projectName);
    console.log('File:', file);
    navigate('/select-type');
  };

  return (
    <div className="container mt-3">
        <div className="text-center">
        <img src={image} alt="Pix2Life Logo" className="img-fluid " style={{ paddingTop: '0px', width:'150px', height:'60px' }} />
      <h2 className="text-center">Create NEW PROJECT</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Searchable Image</label>
          <p style={{fontSize:'0.6rem', color:'black'}}>This is the picture you will be scanning with your mobile camera and is most likely going to be one which you have hanging somewhere in your house/office.</p>
          <p style={{fontSize:'0.6rem', color:'black'}}>If the picture is one that you already have in your storage then please upload it. If you don't then you need to take a picture of it now so it will be saved to your mobile storage.</p>
          <p style={{fontSize:'0.6rem', color:'black'}}>Make sure that there are no shadows across the picture and you are close enough so the whole picture fits inside your camera frame. If it is a picture that is rectangular in shape, you need to turn your camera to landscape view, and once again ensure that all of the picture fits inside your camera frame.</p>
          <input type="file" className="form-control mb-3" onChange={handleFileChange} />
          <button type="button" className="btn btn-success w-100 mb-3">Open Camera & Take Photo</button>
        </div>
        <button type="submit" className="btn btn-primary w-100">Continue</button>
      </form>
    </div>
  );
};

export default CreateProject;
