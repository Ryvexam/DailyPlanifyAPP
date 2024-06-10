import axios from 'axios';

export const handleCheckConnection = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = localStorage.getItem('token');
  const refresh_token = localStorage.getItem('refresh_token');
  const body = JSON.stringify({ token, refresh_token });

  try {
    await axios.post('https://127.0.0.1:8000/api/check/connection', body, config);
    return true; // Connection OK
  } catch (error) {
    return false; // Connection Failed
  }
};
