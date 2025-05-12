import express from 'express';
import { createNestedPackage, getAllActivePackagesWithDetails, getPackageSummary } from '../controllers/packageController.js';

const router = express.Router();
router.post('/packageCreation', createNestedPackage);
router.get('/summary', getPackageSummary);
router.get('/packages', getAllActivePackagesWithDetails);

export default router;