import express from 'express';
import roleRoutes from './roleRoutes.js';
import menuRoutes from './menuRoutes.js';
import roleWiseMenuRoutes from './roleWiseMenuRoutes.js';

const router = express.Router();

router.use('/role', roleRoutes);            // maps to /api/admin/role
router.use('/menu', menuRoutes);            // maps to /api/admin/menu
router.use('/roleWiseMenu', roleWiseMenuRoutes); // maps to /api/admin/role-wise-menu

export default router;