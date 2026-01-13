import axiosInstance from './axiosInstance';
import { LocationOption } from '../interfaces/location.interface';

export const fetchLocations = async (keyword: string): Promise<LocationOption[]> => {
  try {
    const { data } = await axiosInstance.get<LocationOption[]>('/locations', {
      params: { keyword },
    });
    return data;
  } catch (error: any) {
    console.error('Location search error:', error);
    const errorMessage = error.response?.data?.message || 
                        'Failed to fetch locations. Please try again.';
    

    return [];
  }
};
