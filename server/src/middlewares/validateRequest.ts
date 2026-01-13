import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateFlightSearch = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    origin: Joi.string().length(3).required(),
    destination: Joi.string().length(3).required(),
    departureDate: Joi.date().iso().required(),
    returnDate: Joi.date().iso().min(Joi.ref('departureDate')).optional(),
    adults: Joi.number().min(1).default(1),
    children: Joi.number().min(0).default(0),
    infants: Joi.number().min(0).default(0),
    nonStop: Joi.boolean().default(false),
    travelClass: Joi.string().valid('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
