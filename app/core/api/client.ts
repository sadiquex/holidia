import axios from 'axios';
import { getToken, signOut } from '../auth';

console.log(process.env.EXPO_PUBLIC_API_URL, 'logging env');

export const client = axios.create({
  // TODO: Store in an env variable
  baseURL: 'https://holidia-apis.onrender.com',
  timeout: 60000,
});

client.interceptors.request.use(
  (config) => {
    const data = getToken();
    if (data?.access) {
      config.headers['Authorization'] = data.access;
    }
    return config;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);
