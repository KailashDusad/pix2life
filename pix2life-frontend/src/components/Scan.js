import React, { useState } from 'react';
import cv from 'opencv.js';

const Scan = () => {
  const [scannedImage, setScannedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleScan = async (event) => {
    const scannedFile = event.target.files[0];
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(scannedFile);

    imgElement.onload = async () => {
      const mat = cv.imread(imgElement);
      
      // Perform image processing operations using OpenCV.js
      // Convert the image to grayscale
      cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
      
      // After processing, set the scanned image
      setScannedImage(mat);

      // Perform search algorithm to find similar images
      const similarImages = [];
      
      // Get a list of all image files in the assets directory
      const imageFiles = require.context('../assets', true, /\.(png|jpe?g|gif|svg)$/);

      // Loop through each image file and compare it with the scanned image
      imageFiles.keys().forEach((key) => {
        const imageUrl = imageFiles(key);
        const imgElement2 = document.createElement('img');
        imgElement2.src = imageUrl;

        imgElement2.onload = async () => {
          const mat2 = cv.imread(imgElement2);
          cv.cvtColor(mat2, mat2, cv.COLOR_RGBA2GRAY);

          if (compareImages(mat, mat2)) {
            similarImages.push({ id: key, imageUrl });
          }

          // Free up memory
          mat2.delete();
        };
      });

      // Update the search results
      setSearchResults(similarImages);

      // Free up memory
      mat.delete();
    };
  };

  // Function to compare two images and determine their similarity
  const compareImages = (image1, image2) => {
    // Use a simple image comparison algorithm (e.g., mean squared error)
    const diff = new cv.Mat();
    cv.absdiff(image1, image2, diff);
    cv.cvtColor(diff, diff, cv.COLOR_RGBA2GRAY);
    const squaredDiff = diff.mul(diff);
    const meanSquareError = cv.mean(squaredDiff).reduce((a, b) => a + b, 0) / (diff.rows * diff.cols);
    diff.delete();
    squaredDiff.delete();
    return meanSquareError < 0.01; // Adjust the threshold as needed
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleScan} />
      {scannedImage && (
        <div>
          <canvas ref={(canvas) => canvas && cv.imshow(canvas, scannedImage)} />
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((result) => (
            <img key={result.id} src={result.imageUrl} alt="Similar Image" />
          ))}
        </div>
      )}
    </>
  );
};

export default Scan;
