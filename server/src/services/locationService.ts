import amadeus from '../config/amadeus';
import { LocationOption } from '../interfaces/location.interface';

export const searchLocations = async (
  keyword: string
): Promise<LocationOption[]> => {
  if (!keyword || keyword.length < 3) {
    return [];
  }

  const response = await amadeus.referenceData.locations.get({
    keyword,
    subType: 'CITY,AIRPORT',
    view: 'FULL',
    sort: 'analytics.travelers.score',
    page: {
      offset: 0,
      limit: 10
    }
  });

  return response.data.map((loc: any): LocationOption => ({
    iataCode: loc.iataCode,
    city: loc.address?.cityName || loc.name,
    country: loc.address?.countryName || '',
    type: loc.subType
  }));
};
