import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { scanImage } from '../../services/projectService';

const ScanImage = () => {
  const [image, setImage] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleScan = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await scanImage(formData);
      setProjectUrl(response.projectUrl);
    } catch (error) {
      alert('Failed to scan image');
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />
      <button onClick={capture}>Capture</button>
      {image && <img src={image} alt="Scanned" />}
      <button onClick={handleScan}>Scan</button>
      {projectUrl && <p>Project URL: <a href={projectUrl} target="_blank" rel="noopener noreferrer">{projectUrl}</a></p>}
    </div>
  );
};

export default ScanImage;
