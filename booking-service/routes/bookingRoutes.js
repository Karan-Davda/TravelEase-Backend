import express from 'express';
import { confirmBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Booking route working');
});

router.post('/confirm', confirmBooking);


export default router;