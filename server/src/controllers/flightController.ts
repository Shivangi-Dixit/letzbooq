import { Request, Response, NextFunction } from 'express';
import { searchFlights } from '../services/flightService';

export const getFlights = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flights = await searchFlights(req.body);
    res.json({ flights });
  } catch (err) {
    next(err);
  }
};
