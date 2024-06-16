import React, { useState } from 'react';
import axios from 'axios';

const Scan = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:3000/api/scan', formData)
      .then(response => {
        setResult(response.data.projectUrl);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Scan</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleScan}>Scan</button>
      {result && (
        <div>
          <h3>Scan Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Scan;
