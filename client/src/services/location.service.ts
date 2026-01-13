import axiosInstance from './axiosInstance';
import { LocationOption } from '../interfaces/location.interface';
import axios from 'axios';

export const fetchLocations = async (keyword: string): Promise<LocationOption[]> => {
  try {
    const { data } = await axiosInstance.get<LocationOption[]>('/locations', {
      params: { keyword },
    });
    return data;
  } catch (error: any) {
    
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      
      if (axiosError.response?.data?.message) {
        console.error('Location API error:', axiosError.response.data.message);
        throw new Error(axiosError.response.data.message);
      }

      const status = axiosError.response?.status;
      if (status === 400) throw new Error('Invalid search keyword');
      if (status === 429) throw new Error('Too many requests. Please wait.');
      if (status === 500) throw new Error('Location service unavailable');
      
      throw new Error('Network error. Please check your connection.');
    }

    console.error('Location search error:', error);
    throw new Error('Failed to fetch locations. Please try again.');
  }
};
