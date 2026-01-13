import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import { ApiError, Flight, FlightSearchParams } from '../interfaces/flight.interfaces';

interface BackendResponse {
  flights: {
    success: boolean;
    flights?: Flight[];
    error?: string;
  };
}

export const searchFlights = async (
  payload: FlightSearchParams
): Promise<{ success: boolean; flights?: Flight[]; error?: string }> => {
  try {
    const response = await axiosInstance.post<BackendResponse>('/flights/search', payload);

    const backendData = response.data?.flights;

    if (backendData?.success && Array.isArray(backendData.flights)) {
      return {
        success: true,
        flights: backendData.flights  
      };
    }

    return {
      success: false,
      error: backendData?.error || 'No flights found for your criteria'
    };
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response?.data?.flights?.error) {
        return {
          success: false,
          error: axiosError?.response?.data?.flights?.error
        };
      }

      const status = axiosError?.response?.status;
      if (status === 400) return { success: false, error: 'Invalid search parameters' };
      if (status === 429) return { success: false, error: 'Too many requests. Please try again.' };
      if (status === 500) return { success: false, error: 'Flight service temporarily unavailable' };

      return { success: false, error: 'Network error. Please check your connection.' };
    }

    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
};
