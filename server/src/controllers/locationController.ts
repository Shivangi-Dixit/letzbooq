import { Request, Response, NextFunction } from 'express';
import { searchLocations } from '../services/locationService';

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  if (!keyword || typeof keyword !== 'string') return res.status(400).json({ error: 'Keyword required' });

  try {
    const locations = await searchLocations(keyword);
    res.json(locations);
  } catch (err) {
    next(err);
  }
};
