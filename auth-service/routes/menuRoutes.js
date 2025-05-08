// routes/menuRoutes.js
import express from 'express';
import { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu } from '../controllers/menuController.js';

const router = express.Router();

router.post('/', createMenu);
router.get('/', getAllMenus);
router.get('/:id', getMenuById);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

export default router;