import express from 'express';
import {
  CountryController,
  StateController,
  CityController,
  CountyController
} from '../controllers/geoConfigurationController.js';

const router = express.Router();

router.post('/country', CountryController.create);
router.get('/country', CountryController.getAll);
router.get('/country/:id', CountryController.getById);
router.put('/country/:id', CountryController.update);
router.delete('/country/:id', CountryController.delete);

router.post('/state', StateController.create);
router.get('/state', StateController.getAll);
router.get('/state/:id', StateController.getById);
router.put('/state/:id', StateController.update);
router.delete('/state/:id', StateController.delete);

router.post('/city', CityController.create);
router.get('/city', CityController.getAll);
router.get('/city/:id', CityController.getById);
router.put('/city/:id', CityController.update);
router.delete('/city/:id', CityController.delete);

router.post('/county', CountyController.create);
router.get('/county', CountyController.getAll);
router.get('/county/:id', CountyController.getById);
router.put('/county/:id', CountyController.update);
router.delete('/county/:id', CountyController.delete);

export default router;