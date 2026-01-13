import { FlightOffer, TripType } from '../interfaces/flight.interface';

const resolveTripType = (offer: any): TripType => {
  const count = offer.itineraries?.length ?? 0;

  if (count === 1) return 'ONE_WAY';
  if (count === 2) return 'ROUND_TRIP';
  return 'MULTI_CITY';
};

const buildSegmentPricingMap = (offer: any) => {
  const map = new Map<string, any>();

  offer.travelerPricings?.[0]?.fareDetailsBySegment?.forEach((fd: any) => {
    map.set(fd.segmentId, fd);
  });

  return map;
};

const mapJourney = (itinerary: any, pricingMap: Map<string, any>) => ({
  duration: itinerary.duration,
  segments: itinerary.segments.map((s: any) => {
    const pricing = pricingMap.get(s.id);

    return {
      from: s.departure.iataCode,
      to: s.arrival.iataCode,
      departureTime: s.departure.at,
      arrivalTime: s.arrival.at,
      carrier: s.carrierCode,
      flightNumber: s.number,
      duration: s.duration,
      cabin: pricing?.cabin,
      checkedBags: pricing?.includedCheckedBags?.quantity
    };
  })
});

export const mapFlightOffer = (offer: any): FlightOffer => {
  const pricingMap = buildSegmentPricingMap(offer);
  const tripType = resolveTripType(offer);

  return {
    id: offer.id,
    tripType,
    airline: offer.validatingAirlineCodes?.[0],
    seats: offer.numberOfBookableSeats,
    outbound: mapJourney(offer.itineraries[0], pricingMap),
    inbound:
      tripType === 'ROUND_TRIP'
        ? mapJourney(offer.itineraries[1], pricingMap)
        : undefined,
    price: {
      currency: offer.price.currency,
      total: offer.price.grandTotal
    }
  };
};
