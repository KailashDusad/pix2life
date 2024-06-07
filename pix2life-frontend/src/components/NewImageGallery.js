import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewImageGallery.css';

const NewImageGallery = () => {
  const [galleryName, setGalleryName] = useState('');
  const [file, setFile] = useState(null);
  const [textDescription, setTextDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Gallery Name:', galleryName);
    console.log('File:', file);
    console.log('Text Description:', textDescription);
    console.log('Tags:', tags);
  };

  return (
    <div className="container mt-1">
      <h2 className="text-center">NEW IMAGE GALLERY</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="galleryName" className="form-label">Gallery Name</label>
          <input
            type="text"
            className="form-control"
            id="galleryName"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control mb-3" onChange={handleFileChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Text Description</label>
          <input
            type="text"
            className="form-control"
            value={textDescription}
            onChange={(e) => setTextDescription(e.target.value)}
            placeholder="Enter a short description that will appear below the image"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Audio Description</label>
          <p style={{ fontSize: '0.8rem' }}>Use the microphone to record a short audio for this image or if you prefer, upload an existing audio file</p>
          <button type="button" className="btn btn-danger mb-3" style={{ display: 'block', margin: '0 auto' }}>
            <i className="fas fa-microphone"></i> Record Audio
          </button>
          <input type="file" className="form-control mb-3" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center" style={{flexDirection:'column', alignItems:'center'}}>
          <button type="submit" className="btn btn-success mb-2" style={{width:'80%'}}>SAVE + Add another image</button>
          <button type="submit" className="btn btn-danger mb-2" style={{width:'80%'}}>SAVE & Finish</button>
        </div>
      </form>
    </div>
  );
};

export default NewImageGallery;
