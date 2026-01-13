export type TripType = 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY';

export interface FlightOffer {
  id: string;
  tripType: TripType;
  airline: string;
  seats: number;
  outbound: Journey;
  inbound?: Journey;
  price: Price;
}

export interface Journey {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  carrier: string;
  flightNumber: string;
  duration: string;
  cabin?: string;
  checkedBags?: number;
}

export interface Price {
  currency: string;
  total: string;
}
