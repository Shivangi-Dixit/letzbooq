import { Router } from 'express';
import { getFlights } from '../controllers/flightController';
import { validateFlightSearch } from '../middlewares/validateRequest';

const router = Router();

router.post('/search', validateFlightSearch, getFlights);

export default router;
