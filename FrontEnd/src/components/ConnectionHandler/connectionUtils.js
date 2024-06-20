import axios from 'axios';
import API_URL from "../customenv.tsx";

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
    await axios.post(`${API_URL}/api/check/connection`, body, config);
    return true; // Connection OK
  } catch (error) {
    return false; // Connection Failed
  }
};
