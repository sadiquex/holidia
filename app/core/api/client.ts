import axios from 'axios';
import { getToken, signOut } from '../auth';

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
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
    console.log('error in request interceptor:', error);
    if (error.response && error.response.status === 401) {
      signOut();
    }

    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error in response interceptor:', error);
    if (error.response && error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);
