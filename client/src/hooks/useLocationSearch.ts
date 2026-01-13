import { useEffect, useState } from 'react';
import { fetchLocations } from '../services/location.service';
import { LocationOption } from '../interfaces/location.interface';

export const useLocationSearch = (query: string) => {
  const [results, setResults] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLocations(query);
        setResults(data);
      } catch (e) {
        setResults([]);
        setError('Unable to fetch locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const clearError = () => {
    setError(null); 
  };

  return { results, loading, error, clearError };
};
