var Amadeus = require('amadeus');
import 'dotenv/config';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

export default amadeus;
