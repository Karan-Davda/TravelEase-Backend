import express from 'express';
import { searchAccommodations } from '../controllers/accommodationController.js';

const router = express.Router();

router.get('/search', searchAccommodations);

export default router;