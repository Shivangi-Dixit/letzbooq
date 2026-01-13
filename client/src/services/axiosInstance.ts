import axios, { AxiosError } from 'axios';
import { showError } from '../contexts/ErrorContext'; // Your ErrorProvider hook

const API_BASE = process.env.REACT_APP_API_URL!;

if (!API_BASE) throw new Error('REACT_APP_API_URL is not defined in .env');

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  response => response,
  
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (!error.response) {
      showError('Network error. Please check your connection.');
      return Promise.reject(new Error('Network error'));
    }

    const errorMessages: Record<number, string> = {
      400: 'Invalid request. Please check your input.',
      401: 'Session expired. Please log in again.',
      403: 'Access denied. You don’t have permission.',
      404: 'Resource not found.',
      408: 'Request timeout. Please try again.',
      429: 'Too many requests. Please wait.',
      500: 'Server error. Please try again later.',
      502: 'Bad gateway. Server is temporarily down.',
      503: 'Service unavailable. Please try again.'
    };

    const userMessage = errorMessages[status!] || message || 'Something went wrong';
    showError(userMessage);

    console.error('API Error:', {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method
    });

    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
