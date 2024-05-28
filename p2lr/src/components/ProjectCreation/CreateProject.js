import React, { useState } from 'react';
import { createProject } from '../../services/projectService';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [intro, setIntro] = useState('');
  const [closing, setClosing] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMediaFilesChange = (event) => {
    setMediaFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('scanImage', selectedFile);
    formData.append('mediaType', mediaType);
    mediaFiles.forEach((file, index) => {
      formData.append(`mediaFiles[${index}]`, file);
    });
    formData.append('intro', intro);
    formData.append('closing', closing);

    try {
      const response = await createProject(formData);
      alert(response);
    } catch (error) {
      alert('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectName">Project Name</label>
      <input
        id="projectName"
        name="projectName"
        type="text"
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
      />

      <label htmlFor="scanImage">Upload Scannable Image</label>
      <input
        id="scanImage"
        name="scanImage"
        type="file"
        onChange={handleFileChange}
      />

      <label htmlFor="mediaType">Media Type</label>
      <select
        id="mediaType"
        name="mediaType"
        onChange={(e) => setMediaType(e.target.value)}
        value={mediaType}
      >
        <option value="">Select Media Type</option>
        <option value="imageGallery">Image Gallery</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
      </select>

      {mediaType === 'imageGallery' && (
        <>
          <label htmlFor="mediaFiles">Upload Images</label>
          <input
            id="mediaFiles"
            name="mediaFiles"
            type="file"
            multiple
            onChange={handleMediaFilesChange}
          />
        </>
      )}

      {mediaType === 'video' && (
        <>
          <label htmlFor="mediaFiles">Upload Video or Enter URL</label>
          <input
            id="mediaFiles"
            name="mediaFiles"
            type="file"
            onChange={handleMediaFilesChange}
          />
        </>
      )}

      {mediaType === 'audio' && (
        <>
          <label htmlFor="mediaFiles">Upload Audio or Enter URL</label>
          <input
            id="mediaFiles"
            name="mediaFiles"
            type="file"
            onChange={handleMediaFilesChange}
          />
        </>
      )}

      <label htmlFor="intro">Introduction</label>
      <textarea
        id="intro"
        name="intro"
        onChange={(e) => setIntro(e.target.value)}
        value={intro}
      />

      <label htmlFor="closing">Closing</label>
      <textarea
        id="closing"
        name="closing"
        onChange={(e) => setClosing(e.target.value)}
        value={closing}
      />

      <button type="submit">Save Project</button>
    </form>
  );
};

export default CreateProject;
