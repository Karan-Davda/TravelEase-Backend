import express from 'express';
import { searchCityData, suggestCities } from '../controllers/geoController.js';

const router = express.Router();
router.get('/city', searchCityData);
router.get('/suggestCities', suggestCities);

export default router;