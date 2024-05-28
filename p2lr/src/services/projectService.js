import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createProject = async (projectData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token available');

    const response = await axios.post(`${API_URL}/projects`, projectData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const scanImage = async (imageData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  };
  const response = await axios.post(`${API_URL}/scan`, imageData, config);
  return response.data;
};
