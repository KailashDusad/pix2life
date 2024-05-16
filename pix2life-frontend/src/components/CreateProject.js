import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [scanImage, setScanImage] = useState(null);
  const [contentType, setContentType] = useState('');
  const [intro, setIntro] = useState('');
  const [closing, setClosing] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('scanImage', scanImage);
    formData.append('contentType', contentType);
    formData.append('intro', intro);
    formData.append('closing', closing);

    axios.post('http://localhost:3000/api/project', formData)
      .then(response => {
        navigate('/scan');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create Project</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" />
      <input type="file" onChange={(e) => setScanImage(e.target.files[0])} />
      <input type="text" value={contentType} onChange={(e) => setContentType(e.target.value)} placeholder="Content Type" />
      <textarea value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Intro"></textarea>
      <textarea value={closing} onChange={(e) => setClosing(e.target.value)} placeholder="Closing"></textarea>
      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
};

export default CreateProject;
