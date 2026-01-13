import { Router } from 'express';
import flightRoutes from './flightRoutes';
import locationRoutes from './locationRoutes';

const router = Router();

router.use('/flights', flightRoutes);
router.use('/locations', locationRoutes);

export default router;
