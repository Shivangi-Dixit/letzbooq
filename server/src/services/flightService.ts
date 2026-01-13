import amadeus from '../config/amadeus';
import { FlightOffer } from '../interfaces/flight.interface';
import { mapFlightOffer } from '../mappers/flightOffer.mapper';

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  nonStop?: boolean;
  travelClass?: string;
}

interface ApiResponse {
  success: boolean;
  flights?: FlightOffer[];
  error?: string;
}

export const searchFlights = async ({
  origin,
  destination,
  departureDate,
  returnDate,
  adults = 1,
  children = 0,
  infants = 0,
  nonStop = false,
  travelClass = 'ECONOMY'
}: FlightSearchParams): Promise<ApiResponse> => {
  try {
    const params: any = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      children,
      infants,
      nonStop,
      travelClass
    };

    if (returnDate) {
      params.returnDate = returnDate;
    }

    const response = await amadeus.shopping.flightOffersSearch.get(params);

    if (response.data && response.data.length > 0) {
      return {
        success: true,
        flights: response.data.map(mapFlightOffer)
      };
    }


    return {
      success: false,
      error: 'No flights available for your selected dates and route'
    };

  } catch (error: any) {
    console.error('Amadeus flight search failed:', error);


    if (error?.response?.body?.errors?.[0]) {
      const apiError = error.response.body.errors[0];
      const userMessage = `${apiError.title}: ${apiError.detail}`;
      
      return {
        success: false,
        error: userMessage  
      };
    }


    if (error?.code === 'ClientError' || error?.response?.statusCode >= 400) {
      return {
        success: false,
        error: 'Flight search failed. Please check your dates and try again.'
      };
    }


    return {
      success: false,
      error: 'Flight search service temporarily unavailable. Please try again later.'
    };
  }
};
