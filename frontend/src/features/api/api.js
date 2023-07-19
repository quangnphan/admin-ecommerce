import axios from 'axios';

const baseURL = process.env.REACT_APP_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

// Set authorization header for all requests except /login
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url !== '/login') {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
