import { useEffect, useState } from 'react';
import { fetchLocations } from '../services/location.service';
import { LocationOption } from '../interfaces/location.interface';

export const useLocationSearch = (query: string) => {
  const [results, setResults] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query?.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchLocations(query);
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
};
