export interface Segment {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  carrier: string;
  flightNumber: string;
  duration: string;
  cabin: string;
  checkedBags: number;
}

export interface FlightDetails {
  duration: string;
  segments: Segment[];
}

export interface Flight {
  id: string;
  tripType: 'ROUND_TRIP' | 'ONE_WAY';
  airline: string;
  seats: number;
  outbound: FlightDetails;
  inbound?: FlightDetails;
  price: {
    currency: string;
    total: string;
  };
}
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
}

export interface FlightResponse {
  flights: Flight[];
}

export interface ApiError {
  message: string;
  code?: string;
}