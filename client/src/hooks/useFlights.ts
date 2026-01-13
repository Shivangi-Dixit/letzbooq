import { useState } from 'react';
import { searchFlights } from '../services/flights.service';
import { Flight, FlightSearchParams } from '../interfaces/flight.interfaces';

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const fetchFlights = async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null); 
    
    try {
      const response = await searchFlights(params);
      if (response.success) {
        setFlights(response.flights || []);
        setError(null);
      } else {
        setError(response.error || 'Search failed'); 
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null); 
  };

  return { 
    flights, 
    loading, 
    error, 
    fetchFlights, 
    clearError 
  };
};
