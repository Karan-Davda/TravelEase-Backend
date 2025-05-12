import express from 'express';
import { createRoleWiseMenu, getAllRoleWiseMenus, getRoleWiseMenuById, getRoleWiseMenusByRoleId, updateRoleWiseMenu, deleteRoleWiseMenu } from '../controllers/roleWiseMenuController.js';

const router = express.Router();

router.post('/', createRoleWiseMenu);
router.get('/', getAllRoleWiseMenus);
router.get('/:id', getRoleWiseMenuById);
router.get('/Menus/:roleId', getRoleWiseMenusByRoleId);
router.delete('/:id', deleteRoleWiseMenu);

export default router;