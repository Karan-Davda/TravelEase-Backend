import express from 'express';
import { getFlights, getTrains, getBuses, getSeatMap, getAllTransportationTypes } from '../controllers/transportationController.js';

const router = express.Router();

router.get('/flights', getFlights);
router.get('/trains', getTrains);
router.get('/buses', getBuses);
router.get('/types', getAllTransportationTypes);
router.get('/:transportationId/seats', getSeatMap);

export default router;