const axios = require('axios');

const API_URL = 'http://localhost:8080';

const updatePassword = async () => {
  try {
    console.log('Attempting to update password for badalaalu@gmail.com...');
    const response = await axios.post(`${API_URL}/api/auth/update-password`, {
      email: 'badalaalu@gmail.com',
      password: 'admin123'
    });
    console.log('Password updated successfully:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    console.error('Full error:', error);
  }
};

updatePassword(); 