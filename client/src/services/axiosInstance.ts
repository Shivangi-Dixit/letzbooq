import axios, { AxiosError } from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

if (!API_BASE) throw new Error('REACT_APP_API_URL is not defined in .env');

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {

    if (!error.response) {
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
