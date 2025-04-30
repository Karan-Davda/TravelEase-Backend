// routes/menuRoutes.js
import express from 'express';
import { getAllMenus, createMenu, updateMenu, deleteMenu } from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getAllMenus);
router.post('/', createMenu);
router.put('/:menuId', updateMenu);
router.delete('/:menuId', deleteMenu);

export default router;